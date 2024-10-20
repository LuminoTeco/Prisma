import React from 'react'
import { useParams } from 'react-router-dom'
import School from '../../../components/School'
import Institute from '../../../components/Institute'


const Plans = () => {
  
  const { plan } = useParams()

  const renderPlan = () => {
    switch (plan) { 
      case 'school': 
        return <School />
      case 'institute': 
        return <Institute />
    }
  }

  return (
    <div>
      {renderPlan()}
    </div>
  )
}

export default Plans
