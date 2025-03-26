import { EnkaClient } from 'enka-network-api'

// Create a singleton instance
let enkaClientInstance: EnkaClient | null = null

export function getEnkaClient() {
  if (!enkaClientInstance) {
    // Initialize the client with cache directory under the project
    enkaClientInstance = new EnkaClient({
      cacheDirectory: './public/genshin_cache',
      showFetchCacheLog: true,
      defaultLanguage: 'es',
    })

    // Setup the cache directory
    enkaClientInstance.cachedAssetsManager.cacheDirectorySetup()

    // Set up auto-updater
    enkaClientInstance.cachedAssetsManager.activateAutoCacheUpdater({
      instant: true, // Run the first update check immediately
      timeout: 60 * 60 * 1000, // 1 hour interval
      onUpdateStart: async () => {
        console.log('Updating Genshin Data...')
      },
      onUpdateEnd: async () => {
        enkaClientInstance?.cachedAssetsManager.refreshAllData() // Refresh memory
        console.log('Updating Completed!')
      },
    })
  }

  return enkaClientInstance
}

// Helper function to gracefully shutdown the client
export function shutdownEnkaClient() {
  if (enkaClientInstance) {
    enkaClientInstance.cachedAssetsManager.deactivateAutoCacheUpdater()
    enkaClientInstance = null
  }
}
