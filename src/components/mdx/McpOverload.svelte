<script lang="ts">
  const allMcps = ['Gmail', 'Slack', 'Notion', 'GitHub', 'Linear', 'Jira', 'Stripe', 'Figma', 'Calendar', 'Sentry'];
  const focusedMcps = ['GitHub', 'Bash'];
</script>

<div class="mcp-container relative my-8 md:my-12 p-4 sm:p-8 rounded-none bg-neutral-900 border border-neutral-800 shadow-2xl font-sans overflow-hidden w-full">
  
  <div class="text-center mb-10">
    <h3 class="text-2xl font-bold text-white mb-2">MCP Tool Overload vs Focused Setup</h3>
    <p class="text-neutral-400">Loading everything ruins the attention budget.</p>
  </div>

  <div class="flex flex-col md:flex-row gap-12 md:gap-8 items-center justify-around">
    
    <!-- Bad Setup -->
    <div class="flex-1 flex flex-col items-center w-full">
      <div class="mb-6 md:mb-8 px-3 py-1.5 rounded-none bg-red-900/30 border border-red-800 text-red-400 text-xs sm:text-sm font-semibold uppercase tracking-wider text-center">
        Overloaded Setup
      </div>
      
      <div class="relative w-full max-w-[260px] aspect-square flex items-center justify-center transform scale-90 sm:scale-100">
        <!-- Center Agent -->
        <div class="absolute z-10 flex items-center justify-center w-24 h-24 rounded-none bg-gradient-to-br from-red-600 to-red-900 border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <span class="font-bold text-white">Agent</span>
        </div>
        
        <!-- Nodes around -->
        {#each allMcps as mcp, i}
          {@const angle = (i * 36) * (Math.PI / 180)}
          {@const radius = 100}
          {@const x = Math.cos(angle) * radius}
          {@const y = Math.sin(angle) * radius}
          <div 
            class="mcp-bad-node absolute flex items-center justify-center px-3 py-1.5 rounded-none bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 shadow-lg whitespace-nowrap z-20"
            style="transform: translate({x}px, {y}px);"
          >
            {mcp}
          </div>
          <!-- Connection Line -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 260 260">
            <line x1="130" y1="130" x2={130 + x} y2={130 + y} stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 2" />
          </svg>
        {/each}
      </div>
      <p class="mt-8 text-sm text-neutral-400 text-center max-w-[200px]">10 servers continuously injecting entire schemas.</p>
    </div>

    <!-- Divider -->
    <div class="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-neutral-700 to-transparent"></div>

    <!-- Good Setup -->
    <div class="flex-1 flex flex-col items-center w-full mt-4 md:mt-0">
      <div class="mb-6 md:mb-8 px-3 py-1.5 rounded-none bg-emerald-900/30 border border-emerald-800 text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wider text-center">
        Focused Setup
      </div>
      
      <div class="relative w-full max-w-[260px] aspect-square flex items-center justify-center transform scale-90 sm:scale-100">
        <!-- Center Agent -->
        <div class="absolute z-10 flex items-center justify-center w-24 h-24 rounded-none bg-gradient-to-br from-emerald-600 to-emerald-900 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <span class="font-bold text-white">Agent</span>
        </div>
        
        <!-- Nodes around -->
        {#each focusedMcps as mcp, i}
          {@const angle = i === 0 ? Math.PI : 0}
          {@const radius = 90}
          {@const x = Math.cos(angle) * radius}
          {@const y = Math.sin(angle) * radius}
          <div 
            class="mcp-good-node absolute flex items-center justify-center px-4 py-2 rounded-none bg-neutral-800 border border-emerald-700/50 text-sm font-medium text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.1)] whitespace-nowrap z-20"
            style="transform: translate({x}px, {y}px);"
          >
            {mcp}
          </div>
          <!-- Connection Line -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0" viewBox="0 0 260 260">
            <!-- draw thick solid lines -->
            <line x1="130" y1="130" x2={130 + x} y2={130 + y} stroke="#10b981" stroke-width="3" />
          </svg>
        {/each}
        
        <!-- Disconnected nodes -->
        <div class="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 italic opacity-60 mcp-good-node">Others disconnected</div>
      </div>
      <p class="mt-8 text-sm text-neutral-400 text-center max-w-[200px]">Only loads the definitions needed for the task.</p>
    </div>

  </div>
</div>