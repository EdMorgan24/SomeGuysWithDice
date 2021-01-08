import React from 'react'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'

import ClassChart from './ClassChart'

const GET_CLASSES = gql`
  query classPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_ClassOrdering]
    $filter: _ClassFilter
  ) {
    Class(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      name
      characters {
        name
      }
    }
  }
`
const mostUsedClassCalculation = (data: any) => {
  var highestCount = 0;
  var currentCount = 0
  var classString = ""

  data.Class.map((n: any) => {
    currentCount = n.characters.length

    if (currentCount > highestCount) {
      highestCount = currentCount
    }

    return 0
  })

  currentCount = 0

  data.Class.filter((y: any) => y.characters.length === highestCount).map((item:any) => {

    if (currentCount === 0) {
       classString = item.name + " (" + highestCount +")"
       currentCount = 1
    }
    else {
      classString = classString + ", " + item.name + "(" + highestCount +")"
    }

    return 0
  })

  return "Most Used Class: " + classString
}

export default function ClassStats() {

  const { loading, error, data } = useQuery(GET_CLASSES)
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Overall Class Distribution</Title>
      <Typography component="p" >
        {loading ? 'Loading...' : mostUsedClassCalculation(data)}
      </Typography>
      <br/>
      <ClassChart />
    </React.Fragment>
  )
}
