import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../services/recipes'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableStep({ id, index, text, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-[1.5px] border-ink rounded bg-paper-deep p-3 flex items-center gap-3"
    >
      <span
        {...attributes}
        {...listeners}
        className="font-mono text-ink-soft cursor-grab select-none"
      >
        ⠿
      </span>
      <span className="font-serif text-xl text-tomato flex-shrink-0">{index + 1}</span>
      <p className="font-sans text-ink flex-1">{text}</p>
      <button
        onClick={() => onRemove(id)}
        className="font-mono text-xs text-ink-soft hover:text-tomato"
      >
        ×
      </button>
    </div>
  )
}

function AddRecipe() {
  const navigate = useNavigate()
  const [stage, setStage] = useState(1)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [ingredientInput, setIngredientInput] = useState('')
  const [ingredients, setIngredients] = useState([])

  const [stepInput, setStepInput] = useState('')
  const [steps, setSteps] = useState([]) // [{ id, text }]

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor))

  function handleAddIngredient(e) {
    e.preventDefault()
    if (!ingredientInput.trim()) return
    setIngredients((prev) => [...prev, ingredientInput.trim()])
    setIngredientInput('')
  }

  function handleRemoveIngredient(index) {
    setIngredients((prev) => prev.filter((_, i) => i !== index))
  }

  function handleAddStep(e) {
    e.preventDefault()
    if (!stepInput.trim()) return
    setSteps((prev) => [...prev, { id: crypto.randomUUID(), text: stepInput.trim() }])
    setStepInput('')
  }

  function handleRemoveStep(id) {
    setSteps((prev) => prev.filter((s) => s.id !== id))
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setSteps((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id)
      const newIndex = prev.findIndex((s) => s.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    try {
      await createRecipe({
        title,
        description,
        ingredients: ingredients.map((name) => ({ name, measure: '' })),
        steps: steps.map((s) => s.text),
      })
      navigate('/saved')
    } catch (err) {
      setError('Something went wrong saving your recipe. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen px-4 pt-8 pb-20">
      <div className="max-w-xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-wider text-tomato mb-2">
          Step {stage} of 3
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-8">
          {stage === 1 && 'The basics'}
          {stage === 2 && 'The stuff'}
          {stage === 3 && 'The steps'}
        </h1>

        {stage === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-xs uppercase text-ink-soft block mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are we calling this?"
                className="w-full px-4 py-3 bg-paper-deep border-[1.5px] border-ink rounded text-ink placeholder-ink-soft focus:outline-none focus:ring-2 focus:ring-ink"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase text-ink-soft block mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A line or two about it"
                rows={3}
                className="w-full px-4 py-3 bg-paper-deep border-[1.5px] border-ink rounded text-ink placeholder-ink-soft focus:outline-none focus:ring-2 focus:ring-ink resize-none"
              />
            </div>
            <button
              onClick={() => setStage(2)}
              disabled={!title.trim()}
              className="mt-2 px-5 py-2.5 bg-tomato text-paper font-mono text-xs uppercase tracking-wide rounded border-[1.5px] border-ink disabled:opacity-40 self-start"
              style={{ boxShadow: '3px 3px 0 var(--color-ink)' }}
            >
              Next →
            </button>
          </div>
        )}

        {stage === 2 && (
          <div className="flex flex-col gap-4">
            <form onSubmit={handleAddIngredient} className="flex gap-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                placeholder="e.g. 2 eggs — hit enter"
                className="flex-1 px-4 py-3 bg-paper-deep border-[1.5px] border-ink rounded text-ink placeholder-ink-soft focus:outline-none focus:ring-2 focus:ring-ink"
              />
            </form>

            <ul className="flex flex-col gap-2">
              {ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="border-[1.5px] border-ink rounded bg-paper-deep px-4 py-2 flex justify-between items-center"
                >
                  <span className="font-sans text-ink">{ing}</span>
                  <button
                    onClick={() => handleRemoveIngredient(i)}
                    className="font-mono text-xs text-ink-soft hover:text-tomato"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setStage(1)}
                className="px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-soft"
              >
                ← Back
              </button>
              <button
                onClick={() => setStage(3)}
                disabled={ingredients.length === 0}
                className="px-5 py-2.5 bg-tomato text-paper font-mono text-xs uppercase tracking-wide rounded border-[1.5px] border-ink disabled:opacity-40"
                style={{ boxShadow: '3px 3px 0 var(--color-ink)' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="flex flex-col gap-4">
            <form onSubmit={handleAddStep} className="flex gap-2">
              <input
                type="text"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                placeholder="Describe a step — hit enter"
                className="flex-1 px-4 py-3 bg-paper-deep border-[1.5px] border-ink rounded text-ink placeholder-ink-soft focus:outline-none focus:ring-2 focus:ring-ink"
              />
            </form>

            <p className="font-mono text-xs text-ink-soft">Drag to reorder</p>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                  {steps.map((step, i) => (
                    <SortableStep
                      key={step.id}
                      id={step.id}
                      index={i}
                      text={step.text}
                      onRemove={handleRemoveStep}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {error && (
              <p className="font-mono text-xs text-tomato">{error}</p>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setStage(2)}
                className="px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-soft"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={steps.length === 0 || submitting}
                className="px-5 py-2.5 bg-brine text-paper font-mono text-xs uppercase tracking-wide rounded border-[1.5px] border-ink disabled:opacity-40"
                style={{ boxShadow: '3px 3px 0 var(--color-ink)' }}
              >
                {submitting ? 'Filing it away…' : 'Publish recipe'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddRecipe