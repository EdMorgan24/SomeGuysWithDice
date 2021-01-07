import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'

import RaceChart from './RaceChart'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
  aliveCharacters: {
    width: '50%',
    float: 'left'
  },
})

const GET_RACES = gql`
  query racePaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_RaceOrdering]
    $filter: _RaceFilter
  ) {
    Race(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      name
      characters {
        name
      }
    }
  }
`

const mostUsedRaceCalculation = (data: any) => {
  var highestCount = 0;
  var currentCount = 0
  var classString = ""

  data.Race.map((n: any) => {
    currentCount = n.characters.length

    if (currentCount > highestCount) {
      highestCount = currentCount
    }
  })

  currentCount = 0

  {data.Race.filter((y: any) => y.characters.length === highestCount).map((item:any) => {

    if (currentCount === 0) {
       classString = item.name + " (" + highestCount +")"
       currentCount = 1
    }
    else {
      classString = classString + ", " + item.name + "(" + highestCount +")"
    }
  })}

  return "Most Used Race: " + classString
}

export default function ClassStats() {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_RACES)
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Overall Race Distribution</Title>
      <Typography component="p" >
        {loading ? 'Loading...' : mostUsedRaceCalculation(data)}
      </Typography>
      <br/>
      <RaceChart />
    </React.Fragment>
  )
}
