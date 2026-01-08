import { useState, useRef, useEffect } from 'react'
import './CustomSelect.css'

function CustomSelect({ value, onChange, options, placeholder = '선택하세요' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const optionsRef = useRef(null)

  // 현재 선택된 옵션 찾기
  const selectedOption = options.find(opt => opt.value === value)

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 키보드 네비게이션
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
        setHighlightedIndex(options.findIndex(opt => opt.value === value))
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : options.length - 1
        )
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex].value)
          setIsOpen(false)
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  // 옵션 선택
  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  // 하이라이트된 옵션으로 스크롤
  useEffect(() => {
    if (isOpen && optionsRef.current && highlightedIndex >= 0) {
      const highlighted = optionsRef.current.children[highlightedIndex]
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex, isOpen])

  return (
    <div 
      className={`custom-select ${isOpen ? 'open' : ''}`}
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`custom-select-arrow ${isOpen ? 'up' : ''}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="custom-select-options" ref={optionsRef}>
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`custom-select-option ${
                value === option.value ? 'selected' : ''
              } ${highlightedIndex === index ? 'highlighted' : ''}`}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect





