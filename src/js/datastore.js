
export const isDev = import.meta.env.DEV;

const RECAPTCHA_SITE_KEY = 'RECAPTCHA_SITE_KEY'
const SENDGRID_API_KEY = 'SENDGRID_API_KEY'
const TO_EMAIL = 'TO_EMAIL'
const FROM_EMAIL = 'FROM_EMAIL'
const DB_ID = 'vermeulenphotography'

let _datastore = null;

async function getDatastore() {
    const { Datastore } = await import('@google-cloud/datastore')
    if (!_datastore) {
      _datastore = new Datastore({ 
        databaseId: DB_ID, 
        projectId: 'vermeulen-photography'
      });
    }
    return _datastore;
}

/**
 * @type {Record<string, string>}
 */
let savedSettings = {}

/**
 * Retrieves the Recaptcha site key from the saved settings.
 *
 * @return {string} The Recaptcha site key, or an empty string if not found.
 */
export const getRecaptchaSiteKey = () => {
    if (isDev) {
        return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    }
    if (RECAPTCHA_SITE_KEY in savedSettings) {
        return savedSettings[RECAPTCHA_SITE_KEY]
    }
    return ''
}

/**
 * Retrieves the SendGrid API key from the saved settings.
 *
 * @return {string} The SendGrid API key, or an empty string if it is not found.
 */
export const getSendGridApiKey = () => {
    if (SENDGRID_API_KEY in savedSettings) {
        return savedSettings[SENDGRID_API_KEY]
    }
    return ''
}

/**
 * Retrieves the TO_EMAIL from the saved settings.
 *
 * @return {string} The TO_EMAIL, or an empty string if it is not found.
 */
export const getToEmail = () => {
    if (TO_EMAIL in savedSettings) {
        return savedSettings[TO_EMAIL]
    }
    return ''
}

/**
 * Retrieves the FROM_EMAIL from the saved settings.
 *
 * @return {string} The FROM_EMAIL, or an empty string if it is not found.
 */
export const getFromEmail = () => {
    if (FROM_EMAIL in savedSettings) {
        return savedSettings[FROM_EMAIL]
    }
    return ''
}

export const getSettings = async () => {
    if (process.env.NO_DB) {
        return {}
    }

    if (Object.keys(savedSettings).length === 0) {
        try {
            const datastore = await getDatastore()
            const query = datastore.createQuery('Settings')
            const [settings] = await datastore.runQuery(query)
            if (settings.length > 0) {
                savedSettings = settings.reduce((obj, item) => (obj[item.key] = item.value, obj), {})
            } else {
                console.warn('Settings table is empty, using default settings')
            }
        } catch (error) {
            console.error('Error fetching settings:', error.message)
            // Return empty settings instead of throwing to prevent build failures
            return {}
        }
    }
}