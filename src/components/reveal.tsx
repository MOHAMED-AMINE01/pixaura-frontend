"use client"

import {
  type ComponentType,
  type ElementType as ReactElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

type ElementType = ReactElementType | ComponentType<unknown>

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  as?: ElementType
  delay?: number
  once?: boolean
}

export function Reveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let observer: IntersectionObserver | null = null
    
    try {
      observer = new IntersectionObserver(
        (entries) => {
          try {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisible(true)
                if (once && observer) {
                  observer.unobserve(entry.target)
                }
              } else if (!once) {
                setVisible(false)
              }
            })
          } catch (error) {
            console.warn('IntersectionObserver callback error:', error)
          }
        },
        {
          threshold: 0.2,
          rootMargin: "0px",
        }
      )

      observer.observe(element)
    } catch (error) {
      console.warn('IntersectionObserver setup error:', error)
      // Fallback: show immediately if observer fails
      setVisible(true)
    }
    
    return () => {
      try {
        if (observer) {
          observer.disconnect()
        }
      } catch (error) {
        // Silent cleanup error
      }
    }
  }, [once])

  const Tag = Component as any

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{
        ...(rest.style || {}),
        //@ts-ignore css variable
        "--reveal-delay": `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
