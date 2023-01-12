'use client'
import {definePreview} from 'next-sanity/preview'
import {projectId, dataset} from './sanity.client'
function onPublicAccessOnly() {
  throw new Error('Unable to load preview since you are not logged in, please loggin and try again')
}
if (!projectId || !dataset) {
  throw new Error('Missing Project ID or Dataset. check your project files to correct')
}
export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
})
