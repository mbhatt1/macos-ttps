<script setup>
import mitreData from '../../data/mitre-data.json';
const stats = mitreData.stats;
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-number">{{ stats.totalTtps }}</div>
      <div class="stat-label">Total TTPs</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.totalCategories }}</div>
      <div class="stat-label">Categories</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.totalTactics }}</div>
      <div class="stat-label">MITRE Tactics</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.totalTechniques }}</div>
      <div class="stat-label">Techniques</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.platformBreakdown.darwin }}</div>
      <div class="stat-label">macOS TTPs</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.platformBreakdown.linux || 0 }}</div>
      <div class="stat-label">Linux TTPs</div>
    </div>
  </div>
</template>
