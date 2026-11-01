import { ArrowRight } from 'lucide-react'
import { Button } from '../../design-system'
import { PageBanner } from '../components/PageBanner'
import { photos } from '../content/photos'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'

export function NotFoundPage() {
  usePageTitle('Page not found')
  return (
    <>
      <PageBanner
        photo={photos.ladyJustice}
        title="We couldn’t find that page"
        lead="It may have moved, or the link may be mistyped."
        crumbs={[{ label: 'Page not found' }]}
      />
      <section className={page.sectionTight}>
        <div className="container">
          <Button href="/" icon={<ArrowRight />}>
            Go to the home page
          </Button>
        </div>
      </section>
    </>
  )
}
