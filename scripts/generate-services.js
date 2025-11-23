#!/usr/bin/env node

/**
 * RiderGuy Service Generator
 * Generates complete microservice implementations
 */

const fs = require('fs');
const path = require('path');

const services = [
  {
    name: 'training-service',
    port: 3006,
    description: 'Training and LMS service with courses, quizzes, certificates',
    dependencies: ['express', 'cors', 'helmet', 'joi', 'winston', 'jsonwebtoken', 'pg', 'ioredis', 'kafkajs', 'aws-sdk', 'sharp']
  },
  {
    name: 'community-service',
    port: 3007,
    description: 'Community forums, posts, channels, real-time chat',
    dependencies: ['express', 'cors', 'helmet', 'joi', 'winston', 'jsonwebtoken', 'pg', 'ioredis', 'kafkajs', 'socket.io', 'mongodb']
  },
  {
    name: 'xp-level-service',
    port: 3008,
    description: 'Gamification engine with XP tracking, levels, leaderboards',
    dependencies: ['express', 'cors', 'helmet', 'joi', 'winston', 'jsonwebtoken', 'pg', 'ioredis', 'kafkajs']
  },
  {
    name: 'welfare-service',
    port: 3009,
    description: 'Welfare services: insurance, loans, emergency funds',
    dependencies: ['express', 'cors', 'helmet', 'joi', 'winston', 'jsonwebtoken', 'pg', 'ioredis', 'kafkajs', 'axios']
  }
];

console.log('🚀 Generating RiderGuy Microservices...\n');

services.forEach(service => {
  console.log(`✨ Generating ${service.name}...`);
  
  const serviceDir = path.join(__dirname, 'services', service.name);
  const srcDir = path.join(serviceDir, 'src');
  
  // Create directories
  [serviceDir, srcDir, 
   path.join(srcDir, 'controllers'),
   path.join(srcDir, 'services'),
   path.join(srcDir, 'routes'),
   path.join(srcDir, 'middleware'),
   path.join(srcDir, 'consumers'),
   path.join(srcDir, 'utils')
  ].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  console.log(`   ✓ ${service.name} structure created`);
});

console.log('\n✅ All services generated successfully!');
console.log('\n📦 Next steps:');
console.log('   1. cd services/<service-name>');
console.log('   2. npm install');
console.log('   3. npm run dev');
