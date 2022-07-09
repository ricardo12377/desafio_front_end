import { createContext, useState, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

interface LayoutContextProps {
  loading: boolean
  setLoading: (value: boolean) => void
  modal: boolean
  setModal: (value: boolean) => void
}

export const LayoutContext = createContext<LayoutContextProps>(
  {} as LayoutContextProps
)

export function LayoutProvider({ children }: LayoutProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  return (
    <LayoutContext.Provider value={{ loading, modal, setLoading, setModal }}>
      {children}
    </LayoutContext.Provider>
  )
}
