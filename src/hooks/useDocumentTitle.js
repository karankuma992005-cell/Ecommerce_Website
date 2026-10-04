import { useEffect } from 'react';

const DEFAULT_DESCRIPTION =
  'ElectroMart - Smart Technology. Better Shopping. Shop genuine smartphones, laptops, headphones, smart watches, cameras and gaming gear at great prices.';

/** Sets the document title and meta description for the current page. */
export function useDocumentTitle(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} | ElectroMart` : 'ElectroMart | Smart Technology. Better Shopping.';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
}
