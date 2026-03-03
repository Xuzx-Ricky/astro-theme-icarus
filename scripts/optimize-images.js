#!/usr/bin/env node
/**
 * 图片优化脚本
 * 将图片转换为 WebP 格式并压缩
 */

import sharp from 'sharp';
import { glob } from 'glob';
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { resolve, dirname, extname, basename } from 'path';

const CONFIG = {
  // 输入目录
  inputDir: 'public/images',
  // 输出目录
  outputDir: 'dist/images',
  // 图片格式
  format: 'webp',
  // 图片质量
  quality: 80,
  // 是否保留原图
  keepOriginal: true,
  // 支持的格式
  supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
};

async function optimizeImages() {
  console.log('🖼️  开始优化图片...\n');
  
  try {
    // 查找所有图片
    const patterns = CONFIG.supportedFormats.map(ext => `${CONFIG.inputDir}/**/*${ext}`);
    const files = [];
    
    for (const pattern of patterns) {
      const matches = await glob(pattern, { absolute: true });
      files.push(...matches);
    }
    
    if (files.length === 0) {
      console.log('⚠️  未找到图片文件');
      return;
    }
    
    console.log(`📁 找到 ${files.length} 个图片文件\n`);
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    for (const file of files) {
      const relativePath = file.replace(resolve(process.cwd(), CONFIG.inputDir), '');
      const ext = extname(file);
      const name = basename(file, ext);
      const dir = dirname(file).replace(resolve(process.cwd(), CONFIG.inputDir), '');
      
      // 读取原图
      const buffer = await readFile(file);
      const originalSize = buffer.length;
      
      // 优化图片
      const optimized = await sharp(buffer)
        .webp({ quality: CONFIG.quality, effort: 6 })
        .toBuffer();
      
      // 确保输出目录存在
      const outputDir = resolve(process.cwd(), CONFIG.outputDir, dir);
      await mkdir(outputDir, { recursive: true });
      
      // 保存优化后的图片
      const outputPath = resolve(outputDir, `${name}.webp`);
      await writeFile(outputPath, optimized);
      
      const optimizedSize = optimized.length;
      const savings = originalSize - optimizedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
      
      totalOriginal += originalSize;
      totalOptimized += optimizedSize;
      
      console.log(`✅ ${relativePath}`);
      console.log(`   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savingsPercent}% 减少)\n`);
    }
    
    const totalSavings = totalOriginal - totalOptimized;
    const totalSavingsPercent = ((totalSavings / totalOriginal) * 100).toFixed(1);
    
    console.log('📊 优化统计');
    console.log('═══════════════════════════════════════');
    console.log(`总原始大小: ${formatBytes(totalOriginal)}`);
    console.log(`总优化大小: ${formatBytes(totalOptimized)}`);
    console.log(`节省空间:   ${formatBytes(totalSavings)} (${totalSavingsPercent}%)`);
    console.log('═══════════════════════════════════════');
    
  } catch (error) {
    console.error('❌ 优化失败:', error);
    process.exit(1);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

optimizeImages();
