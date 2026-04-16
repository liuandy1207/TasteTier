import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      // Fetch restaurants and their dishes in one query
      const { data, error } = await supabase
        .from('restaurants')
        .select(`
          *,
          dishes (*)
        `)
        .order('created_at', { ascending: true })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Shape the data to match the tierList format the app expects
      const shaped = data.map(r => {
        const tierList = { S: [], A: [], B: [], C: [], D: [] }
        const sorted = [...r.dishes].sort((a, b) => a.sort_order - b.sort_order)
        sorted.forEach(d => {
          if (tierList[d.tier]) tierList[d.tier].push(d)
        })
        return { ...r, tierList }
      })

      setRestaurants(shaped)
      setLoading(false)
    }

    fetchAll()
  }, [])

  return { restaurants, loading, error }
}