import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModuleNest.register({ ttl: 900000000 }), // Cache for 10 days
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
