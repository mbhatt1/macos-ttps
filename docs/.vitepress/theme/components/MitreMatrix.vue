<script setup>
import { ref } from 'vue';
import mitreData from '../../data/mitre-data.json';

const expandedTactics = ref(new Set());
const expandedTechniques = ref(new Set());

function toggleTactic(id) {
  if (expandedTactics.value.has(id)) {
    expandedTactics.value.delete(id);
  } else {
    expandedTactics.value.add(id);
  }
}

function toggleTechnique(id) {
  if (expandedTechniques.value.has(id)) {
    expandedTechniques.value.delete(id);
  } else {
    expandedTechniques.value.add(id);
  }
}

function tacticTtpCount(tactic) {
  let count = 0;
  for (const t of tactic.techniques) {
    count += t.ttps.length;
  }
  return count;
}
</script>

<template>
  <div class="mitre-matrix">
    <div v-for="tactic in mitreData.tactics" :key="tactic.id" class="tactic-section">
      <div class="tactic-header" @click="toggleTactic(tactic.id)">
        <span class="chevron" :class="{ open: expandedTactics.has(tactic.id) }">&#9654;</span>
        <span class="tactic-id">{{ tactic.id }}</span>
        <span class="tactic-name">{{ tactic.name }}</span>
        <span class="tactic-count">{{ tactic.techniques.length }} techniques &middot; {{ tacticTtpCount(tactic) }} TTPs</span>
      </div>

      <div v-if="expandedTactics.has(tactic.id)" class="technique-list">
        <div v-for="tech in tactic.techniques" :key="tech.id" class="technique-card">
          <div class="technique-header" @click="toggleTechnique(tech.id)" style="cursor:pointer">
            <span class="technique-id">{{ tech.id }}</span>
            <span class="technique-name">{{ tech.name }}</span>
            <span class="technique-ttp-count">{{ tech.ttps.length }}</span>
          </div>

          <div v-if="expandedTechniques.has(tech.id)">
            <div class="ttp-links">
              <a v-for="ttp in tech.ttps" :key="ttp.slug" :href="`/ttps/${ttp.category}/${ttp.slug}`">
                {{ ttp.name }}
              </a>
            </div>

            <div v-if="tech.subtechniques.length" class="subtechnique-section">
              <div class="subtechnique-label">Subtechniques:</div>
              <div v-for="sub in tech.subtechniques" :key="sub.id" style="margin-left: 12px; margin-bottom: 4px;">
                <span class="technique-id">{{ sub.id }}</span>
                <span style="font-size: 0.85rem;">{{ sub.name }}</span>
                <div class="ttp-links" style="margin-left: 12px;">
                  <a v-for="ttp in sub.ttps" :key="ttp.slug" :href="`/ttps/${ttp.category}/${ttp.slug}`">
                    {{ ttp.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
