import Iframe from 'sanity-plugin-iframe-pane'
import type {DefaultDocumentNodeResolver} from 'sanity/desk'
export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: `${process.env.HOST_URL || 'http://localhost:3000'}/api/preview`,
          defaultSize: `desktop`, // default `desktop`
          reload: {
            button: true, // default `undefined`
            revision: true, // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
          },
          attributes: {
            allow: 'fullscreen', // string, optional
          },
        })
        .title('Preview'),
    ])
  }
}
