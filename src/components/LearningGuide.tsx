import type { CSSProperties } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
} from 'lucide-react'
import { books, lessonMeta, type Book, type LessonId } from '../data/books'

type GuideProps = {
  book: Book
  lesson: LessonId
  completed: string[]
  onLessonChange: (lesson: LessonId) => void
  onBack: () => void
  onOpenBook: (book: Book, lesson?: LessonId) => void
  onToggleComplete: (key: string) => void
}

function StoryArc({ book }: { book: Book }) {
  return (
    <div className="story-arc" aria-label={`Story arc for ${book.shortTitle}`}>
      <div className="arc-line" aria-hidden="true" />
      {book.arc.stages.map((stage, index) => (
        <article className="arc-stage" key={stage.title}>
          <div className="arc-marker" aria-hidden="true">
            <span>{index + 1}</span>
          </div>
          <p className="arc-phase">{stage.phase}</p>
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
        </article>
      ))}
    </div>
  )
}

function CharacterMap({ book }: { book: Book }) {
  return (
    <div className="character-map" aria-label={`Character relationship map for ${book.shortTitle}`}>
      <svg className="character-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {book.characters.nodes.map((node) => (
          <line key={node.name} x1="50" y1="50" x2={node.x} y2={node.y} />
        ))}
        <circle cx="50" cy="50" r="20" />
      </svg>
      <div className="character-center">
        <span>Central perspective</span>
        <strong>Harry</strong>
        <p>{book.characters.centerRole}</p>
      </div>
      {book.characters.nodes.map((node) => (
        <article
          className="character-node"
          key={node.name}
          style={{ '--node-x': `${node.x}%`, '--node-y': `${node.y}%` } as CSSProperties}
        >
          <p>{node.relation}</p>
          <h3>{node.name}</h3>
          <span>{node.role}</span>
        </article>
      ))}
    </div>
  )
}

function ThemeMap({ book }: { book: Book }) {
  return (
    <div className="theme-map" aria-label={`Theme analysis for ${book.shortTitle}`}>
      <div className="spectrum-list">
        {book.themes.spectra.map((theme) => (
          <article className="spectrum" key={theme.label}>
            <div className="spectrum-heading">
              <h3>{theme.label}</h3>
              <p>{theme.note}</p>
            </div>
            <div className="spectrum-labels" aria-hidden="true">
              <span>{theme.left}</span>
              <span>{theme.right}</span>
            </div>
            <div
              className="spectrum-track"
              role="img"
              aria-label={`${theme.label}: between ${theme.left} and ${theme.right}, the story leans toward ${theme.right}`}
            >
              <span className="spectrum-fill" style={{ width: `${theme.value}%` }} />
              <span className="spectrum-dot" style={{ left: `${theme.value}%` }} />
            </div>
          </article>
        ))}
      </div>
      <aside className="discussion-card">
        <span>Discussion prompt</span>
        <p>{book.themes.discussion}</p>
      </aside>
    </div>
  )
}

export default function LearningGuide({
  book,
  lesson,
  completed,
  onLessonChange,
  onBack,
  onOpenBook,
  onToggleComplete,
}: GuideProps) {
  const lessonIndex = lessonMeta.findIndex((item) => item.id === lesson)
  const currentMeta = lessonMeta[lessonIndex]
  const completeKey = `${book.id}:${lesson}`
  const isComplete = completed.includes(completeKey)
  const bookCompleted = lessonMeta.filter((item) => completed.includes(`${book.id}:${item.id}`)).length
  const nextBook = books[book.number % books.length]
  const guideStyle = { '--book-accent': book.accent, '--book-bg': book.background } as CSSProperties

  const title = lesson === 'arc' ? book.arc.title : lesson === 'characters' ? book.characters.title : book.themes.title
  const introduction =
    lesson === 'arc' ? book.arc.introduction : lesson === 'characters' ? book.characters.introduction : book.themes.introduction
  const insight =
    lesson === 'arc' ? book.arc.insight : lesson === 'characters' ? book.characters.insight : book.themes.takeaway

  const moveLesson = (direction: number) => {
    const nextIndex = lessonIndex + direction
    if (nextIndex >= 0 && nextIndex < lessonMeta.length) {
      onLessonChange(lessonMeta[nextIndex].id)
      document.getElementById('visual-lesson')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="guide-page" style={guideStyle}>
      <section className="guide-hero">
        <div className="guide-hero-art" aria-hidden="true">
          <img src={book.cover} alt="" />
        </div>
        <div className="guide-hero-inner page-gutter">
          <button className="back-button" type="button" onClick={onBack}>
            <ArrowLeft size={18} />
            Back to library
          </button>
          <div className="guide-book-meta">
            <div className="guide-cover-wrap">
              <img className="guide-cover" src={book.cover} alt={`Cover of ${book.title}`} />
              <span>Book {book.number}</span>
            </div>
            <div className="guide-heading">
              <p className="guide-eyebrow">Visual reading guide · {book.year}</p>
              <h1>{book.shortTitle}</h1>
              <p className="guide-synopsis">{book.synopsis}</p>
              <div className="guide-tags">
                <span><BookOpen size={15} /> 3 visual lessons</span>
                <span>Full-story spoilers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-workspace page-gutter" id="visual-lesson" aria-label="Interactive visual lessons">
        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-heading">
            <p>Your visual guide</p>
            <span>{bookCompleted} of 3 complete</span>
          </div>
          <div className="lesson-progress" aria-label={`${bookCompleted} of 3 lessons complete`}>
            <span style={{ width: `${(bookCompleted / 3) * 100}%` }} />
          </div>
          <div className="lesson-tabs" role="tablist" aria-label="Lessons">
            {lessonMeta.map((item, index) => {
              const done = completed.includes(`${book.id}:${item.id}`)
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={lesson === item.id}
                  className={`lesson-tab ${lesson === item.id ? 'is-active' : ''}`}
                  key={item.id}
                  onClick={() => onLessonChange(item.id)}
                >
                  <span className="lesson-tab-number">{done ? <Check size={16} /> : `0${index + 1}`}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                  <ChevronRight size={18} />
                </button>
              )
            })}
          </div>
          <div className="reading-question">
            <span>Read with this question</span>
            <p>{book.readingQuestion}</p>
          </div>
        </aside>

        <article className="lesson-canvas" key={`${book.id}-${lesson}`} role="tabpanel">
          <header className="lesson-header">
            <p>Lesson 0{lessonIndex + 1} · {currentMeta.label}</p>
            <h2>{title}</h2>
            <div className="lesson-introduction">{introduction}</div>
          </header>

          <div className="diagram-wrap">
            {lesson === 'arc' && <StoryArc book={book} />}
            {lesson === 'characters' && <CharacterMap book={book} />}
            {lesson === 'themes' && <ThemeMap book={book} />}
          </div>

          <div className="lesson-insight">
            <span>The idea to keep</span>
            <p>{insight}</p>
          </div>

          <div className="lesson-actions">
            <button
              className={`complete-button ${isComplete ? 'is-complete' : ''}`}
              type="button"
              onClick={() => onToggleComplete(completeKey)}
              aria-pressed={isComplete}
            >
              <CircleCheck size={19} />
              {isComplete ? 'Lesson complete' : 'Mark lesson complete'}
            </button>
            <div className="lesson-pager">
              <button type="button" onClick={() => moveLesson(-1)} disabled={lessonIndex === 0} aria-label="Previous lesson">
                <ChevronLeft size={20} />
              </button>
              <span>{lessonIndex + 1} / 3</span>
              {lessonIndex < 2 ? (
                <button type="button" onClick={() => moveLesson(1)} aria-label="Next lesson">
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button type="button" onClick={() => onOpenBook(nextBook)} aria-label={`Open ${nextBook.shortTitle}`}>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </article>
      </section>

      <section className="next-book-section page-gutter">
        <div>
          <p>Continue the reading journey</p>
          <h2>Next: {nextBook.shortTitle}</h2>
        </div>
        <button type="button" className="next-book-card" onClick={() => onOpenBook(nextBook)}>
          <img src={nextBook.cover} alt="" />
          <span>
            <small>Book {nextBook.number} · {nextBook.year}</small>
            <strong>{nextBook.logline}</strong>
          </span>
          <ArrowRight size={24} />
        </button>
      </section>
    </main>
  )
}
