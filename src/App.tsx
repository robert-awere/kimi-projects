import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Info,
  LibraryBig,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import LearningGuide from './components/LearningGuide'
import { books, lessonMeta, type Book, type LessonId } from './data/books'

type LibraryView = 'library' | 'my-list'

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The experience remains functional when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand" type="button" onClick={onClick} aria-label="Lumos home">
      <span className="brand-mark" aria-hidden="true"><Sparkles size={19} /></span>
      <span>LUMOS</span>
      <small>LIBRARY</small>
    </button>
  )
}

function Header({
  view,
  savedCount,
  onHome,
  onView,
  onSearch,
  onAbout,
}: {
  view: LibraryView
  savedCount: number
  onHome: () => void
  onView: (view: LibraryView) => void
  onSearch: () => void
  onAbout: () => void
}) {
  return (
    <header className="site-header page-gutter">
      <Brand onClick={onHome} />
      <nav className="main-nav" aria-label="Main navigation">
        <button aria-label="Library" className={view === 'library' ? 'is-active' : ''} type="button" onClick={() => onView('library')}>
          <LibraryBig size={17} />
          <span>Library</span>
        </button>
        <button aria-label={`My list, ${savedCount} saved`} className={view === 'my-list' ? 'is-active' : ''} type="button" onClick={() => onView('my-list')}>
          <Bookmark size={17} />
          <span>My list</span>
          {savedCount > 0 && <small>{savedCount}</small>}
        </button>
        <button type="button" aria-label="How it works" onClick={onAbout}>
          <Info size={17} />
          <span>How it works</span>
        </button>
      </nav>
      <button className="search-trigger" type="button" onClick={onSearch} aria-label="Search the library">
        <Search size={19} />
        <span>Search</span>
        <kbd>/</kbd>
      </button>
    </header>
  )
}

function BookCard({
  book,
  saved,
  completed,
  onOpen,
  onToggleSaved,
}: {
  book: Book
  saved: boolean
  completed: string[]
  onOpen: () => void
  onToggleSaved: () => void
}) {
  const progress = lessonMeta.filter((lesson) => completed.includes(`${book.id}:${lesson.id}`)).length
  return (
    <article className="book-card">
      <button className="book-card-main" type="button" onClick={onOpen} aria-label={`Open visual guide for ${book.title}`}>
        <span className="book-poster">
          <img src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
          <span className="poster-shade" />
          <span className="poster-number">0{book.number}</span>
          {progress > 0 && (
            <span className="poster-progress" aria-label={`${progress} of 3 lessons complete`}>
              <span style={{ width: `${(progress / 3) * 100}%` }} />
            </span>
          )}
          <span className="poster-open"><BookOpen size={17} /> Open guide</span>
        </span>
        <span className="book-card-copy">
          <strong>{book.shortTitle}</strong>
          <small>Book {book.number} · {book.year}</small>
        </span>
      </button>
      <button
        className={`save-book ${saved ? 'is-saved' : ''}`}
        type="button"
        onClick={onToggleSaved}
        aria-label={saved ? `Remove ${book.shortTitle} from my list` : `Save ${book.shortTitle} to my list`}
        aria-pressed={saved}
      >
        {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>
    </article>
  )
}

function BookRow({
  title,
  subtitle,
  items,
  savedIds,
  completed,
  onOpenBook,
  onToggleSaved,
}: {
  title: string
  subtitle: string
  items: Book[]
  savedIds: string[]
  completed: string[]
  onOpenBook: (book: Book) => void
  onToggleSaved: (id: string) => void
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const scroll = (direction: number) => {
    const element = scroller.current
    if (element) element.scrollBy({ left: direction * element.clientWidth * 0.78, behavior: 'smooth' })
  }

  return (
    <section className="book-row-section" aria-labelledby="collection-title">
      <div className="row-heading page-gutter">
        <div>
          <h2 id="collection-title">{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="row-arrows">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll books left"><ChevronLeft size={21} /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll books right"><ChevronRight size={21} /></button>
        </div>
      </div>
      <div className="book-scroller page-gutter" ref={scroller}>
        {items.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            saved={savedIds.includes(book.id)}
            completed={completed}
            onOpen={() => onOpenBook(book)}
            onToggleSaved={() => onToggleSaved(book.id)}
          />
        ))}
      </div>
    </section>
  )
}

function Hero({
  saved,
  onOpenBook,
  onToggleSaved,
}: {
  saved: boolean
  onOpenBook: (book: Book) => void
  onToggleSaved: (id: string) => void
}) {
  const featured = books[0]
  return (
    <section className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <img src={featured.cover} alt="" />
      </div>
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-content page-gutter">
        <div className="hero-copy">
          <p className="hero-kicker"><Sparkles size={15} /> A visual reading experience</p>
          <h1>Read beyond<br /><em>the story.</em></h1>
          <p className="hero-description">
            Revisit the seven-book journey through cinematic story arcs, character maps, and the ideas that make the series endure.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onOpenBook(featured)}>
              <BookOpen size={19} /> Start with book one
            </button>
            <button className={`secondary-button ${saved ? 'is-saved' : ''}`} type="button" onClick={() => onToggleSaved(featured.id)}>
              {saved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
              {saved ? 'Saved to my list' : 'Add to my list'}
            </button>
          </div>
          <p className="hero-note">21 visual lessons · Full-series spoilers</p>
        </div>
        <div className="hero-books" aria-label="Choose a Harry Potter book">
          {books.map((book, index) => (
            <button
              type="button"
              className="hero-cover"
              key={book.id}
              style={{
                '--cover-x': `${(index - 3) * 48}px`,
                '--cover-y': `${Math.abs(index - 3) * 12}px`,
                '--cover-r': `${(index - 3) * 6}deg`,
                zIndex: index === 0 ? 8 : 7 - Math.abs(index - 3),
              } as CSSProperties}
              onClick={() => onOpenBook(book)}
              aria-label={`Open ${book.title}`}
            >
              <img src={book.cover} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  )
}

const paths: { book: Book; lesson: LessonId; category: string; title: string; text: string }[] = [
  { book: books[0], lesson: 'arc', category: 'Narrative', title: 'The hero’s journey', text: 'Trace the thresholds, tests, and choices that move a story forward.' },
  { book: books[2], lesson: 'characters', category: 'Relationships', title: 'Who can we trust?', text: 'See how new evidence transforms an entire network of characters.' },
  { book: books[6], lesson: 'themes', category: 'Ideas', title: 'Power, choice & sacrifice', text: 'Explore why the final victory depends on giving power away.' },
]

export default function App() {
  const [view, setView] = useState<LibraryView>('library')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [lesson, setLesson] = useState<LessonId>('arc')
  const [savedIds, setSavedIds] = useStoredState<string[]>('lumos-saved', [])
  const [completed, setCompleted] = useStoredState<string[]>('lumos-completed', [])
  const [searchOpen, setSearchOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [query, setQuery] = useState('')
  const libraryScroll = useRef(0)

  const toggleSaved = (id: string) => {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const toggleComplete = (key: string) => {
    setCompleted((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])
  }

  const openBook = (book: Book, nextLesson: LessonId = 'arc') => {
    if (!selectedBook) libraryScroll.current = window.scrollY
    setSelectedBook(book)
    setLesson(nextLesson)
    setSearchOpen(false)
    setQuery('')
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  }

  const backToLibrary = () => {
    setSelectedBook(null)
    window.requestAnimationFrame(() => window.scrollTo({ top: libraryScroll.current, behavior: 'instant' }))
  }

  const goHome = () => {
    setView('library')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
      if (event.key === '/' && !isTyping && !selectedBook) {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape' && selectedBook) backToLibrary()
      if (selectedBook && !isTyping && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        const index = lessonMeta.findIndex((item) => item.id === lesson)
        const nextIndex = index + (event.key === 'ArrowRight' ? 1 : -1)
        if (nextIndex >= 0 && nextIndex < lessonMeta.length) setLesson(lessonMeta[nextIndex].id)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [selectedBook, lesson])

  const filteredBooks = books.filter((book) => `${book.title} ${book.logline}`.toLowerCase().includes(query.toLowerCase()))
  const savedBooks = books.filter((book) => savedIds.includes(book.id))

  if (selectedBook) {
    return (
      <LearningGuide
        book={selectedBook}
        lesson={lesson}
        completed={completed}
        onLessonChange={setLesson}
        onBack={backToLibrary}
        onOpenBook={openBook}
        onToggleComplete={toggleComplete}
      />
    )
  }

  return (
    <div className="library-app">
      <Header
        view={view}
        savedCount={savedIds.length}
        onHome={goHome}
        onView={(nextView) => { setView(nextView); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        onSearch={() => setSearchOpen(true)}
        onAbout={() => setAboutOpen(true)}
      />

      {view === 'library' ? (
        <main>
          <Hero saved={savedIds.includes(books[0].id)} onOpenBook={openBook} onToggleSaved={toggleSaved} />
          <div className="library-content" id="collection">
            <BookRow
              title="The complete journey"
              subtitle="Seven books. Three visual lessons each. Begin anywhere."
              items={books}
              savedIds={savedIds}
              completed={completed}
              onOpenBook={openBook}
              onToggleSaved={toggleSaved}
            />

            <section className="paths-section page-gutter" aria-labelledby="paths-title">
              <div className="row-heading paths-heading">
                <div>
                  <h2 id="paths-title">Choose your way in</h2>
                  <p>Follow an idea across the page, not just a plot.</p>
                </div>
              </div>
              <div className="paths-grid">
                {paths.map((path) => (
                  <button
                    className="path-card"
                    type="button"
                    key={path.title}
                    onClick={() => openBook(path.book, path.lesson)}
                  >
                    <img src={path.book.cover} alt="" loading="lazy" />
                    <span className="path-shade" />
                    <span className="path-copy">
                      <small>{path.category}</small>
                      <strong>{path.title}</strong>
                      <span>{path.text}</span>
                      <em>Explore lesson <ArrowRight size={17} /></em>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="saved-page page-gutter">
          <div className="saved-heading">
            <p>Your personal shelf</p>
            <h1>My reading list</h1>
            <span>{savedBooks.length === 0 ? 'A place for the books you want to revisit.' : `${savedBooks.length} ${savedBooks.length === 1 ? 'book' : 'books'} saved in this browser.`}</span>
          </div>
          {savedBooks.length > 0 ? (
            <div className="saved-grid">
              {savedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  saved
                  completed={completed}
                  onOpen={() => openBook(book)}
                  onToggleSaved={() => toggleSaved(book.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-list">
              <Bookmark size={34} />
              <h2>Your shelf is waiting.</h2>
              <p>Save any book from the collection and it will appear here.</p>
              <button className="primary-button" type="button" onClick={goHome}>Browse the collection <ArrowRight size={18} /></button>
            </div>
          )}
        </main>
      )}

      <footer className="site-footer page-gutter">
        <Brand onClick={goHome} />
        <p>Stories become clearer when you can see their structure.</p>
        <small>Unofficial educational experience. Book titles and cover art belong to their respective rights holders.</small>
      </footer>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-dialog" showCloseButton={false}>
          <DialogHeader className="sr-only">
            <DialogTitle>Search the library</DialogTitle>
            <DialogDescription>Find a Harry Potter book by title or theme.</DialogDescription>
          </DialogHeader>
          <div className="search-input-wrap">
            <Search size={23} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles or ideas…"
              aria-label="Search books"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={21} /></button>
          </div>
          <div className="search-results">
            <p>{query ? `${filteredBooks.length} results` : 'The complete collection'}</p>
            {filteredBooks.length > 0 ? filteredBooks.map((book) => (
              <button type="button" key={book.id} onClick={() => openBook(book)}>
                <img src={book.cover} alt="" />
                <span>
                  <strong>{book.shortTitle}</strong>
                  <small>Book {book.number} · {book.logline}</small>
                </span>
                <ArrowRight size={20} />
              </button>
            )) : (
              <div className="no-results">
                <h3>No books found</h3>
                <p>Try a title such as “Azkaban” or an idea such as “power”.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="about-dialog">
          <DialogHeader>
            <DialogTitle>Read with your eyes.</DialogTitle>
            <DialogDescription>Three ways to see each story more clearly.</DialogDescription>
          </DialogHeader>
          <div className="about-steps">
            {lessonMeta.map((item, index) => (
              <div key={item.id}>
                <span>0{index + 1}</span>
                <p><strong>{item.label}</strong>{index === 0 ? 'Follow the plot’s turning points and emotional architecture.' : index === 1 ? 'See how loyalty, conflict, and influence connect the cast.' : 'Compare the tensions and questions beneath the adventure.'}</p>
              </div>
            ))}
          </div>
          <p className="about-note">Your list and lesson progress are saved only in this browser.</p>
          <button className="primary-button" type="button" onClick={() => setAboutOpen(false)}>Got it <ArrowRight size={18} /></button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
