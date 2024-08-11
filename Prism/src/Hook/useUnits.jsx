import { useState, useEffect } from 'react'
import axios from 'axios'

const useUnits = () => {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await axios.get('http://localhost:8081/units')
                setUnits(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUnits()
    }, [])

    return { units, loading, error }
}

export default useUnits