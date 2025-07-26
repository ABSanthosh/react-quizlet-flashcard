import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useFlashcard } from '../hooks/useFlashcard'

describe('useFlashcard', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFlashcard({}))

    expect(result.current.state).toBe('front')
    expect(result.current.manualFlip).toBe(false)
    expect(result.current.disableFlip).toBe(false)
    expect(result.current.flipDirection).toBe('bt')
  })

  it('should toggle state from front to back on flip()', () => {
    const { result } = renderHook(() => useFlashcard({}))

    act(() => {
      result.current.flip()
    })

    expect(result.current.state).toBe('back')
  })

  it('should toggle state from back to front on flip()', () => {
    const { result } = renderHook(() => useFlashcard({}))

    act(() => {
      result.current.flip()
    })
    expect(result.current.state).toBe('back')

    act(() => {
      result.current.flip()
    })
    expect(result.current.state).toBe('front')
  })

  it('should explicitly set state to "back" with flip("back")', () => {
    const { result } = renderHook(() => useFlashcard({}))

    act(() => {
      result.current.flip('back')
    })

    expect(result.current.state).toBe('back')
  })

  it('should call onFlip with the new state when state changes', () => {
    const onFlipMock = vi.fn()
    const { result } = renderHook(() => useFlashcard({ onFlip: onFlipMock }))

    act(() => {
      result.current.flip()
    })

    expect(onFlipMock).toHaveBeenCalledOnce()
    expect(onFlipMock).toHaveBeenCalledWith('back')
  })

  it('should not call onFlip when state does not change', () => {
    const onFlipMock = vi.fn()
    const { result } = renderHook(() => useFlashcard({ onFlip: onFlipMock }))

    act(() => {
      result.current.flip('front')
    })

    expect(onFlipMock).not.toHaveBeenCalled()
  })

  it('should not flip if disableFlip is true', () => {
    const onFlipMock = vi.fn()
    const { result } = renderHook(() => useFlashcard({ disableFlip: true, onFlip: onFlipMock }))

    act(() => {
      result.current.flip()
    })

    expect(result.current.state).toBe('front')
    expect(onFlipMock).not.toHaveBeenCalled()
  })

  it('should reset the state to "front" with resetCardState', () => {
    const { result } = renderHook(() => useFlashcard({}))

    act(() => {
      result.current.flip()
    })
    expect(result.current.state).toBe('back')

    act(() => {
      result.current.resetCardState()
    })
    expect(result.current.state).toBe('front')
  })

  it('should accept and return custom props', () => {
    const { result } = renderHook(() =>
      useFlashcard({
        manualFlip: true,
        flipDirection: 'rtl',
      })
    )

    expect(result.current.manualFlip).toBe(true)
    expect(result.current.flipDirection).toBe('rtl')
  })
})
