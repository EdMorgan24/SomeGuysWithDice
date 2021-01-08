import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'

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

const GET_COUNT_QUERY = gql`
  {
    oneShotCount
    oneShotSystemCount {
      name
      count
    }
  }
`

export default function OneShotStats() {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_COUNT_QUERY)
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Total One Shots Played</Title>
      <Typography component="p" variant="h4">
        {loading ? 'Loading...' : data.oneShotCount}
      </Typography>
      <Title>Systems Played in One Shots</Title>
      <div>
        <div className={classes.aliveCharacters}>
          <Typography component="p" variant="h4">
            {loading ? 'Loading...' : data.oneShotSystemCount.length}
          </Typography>
        </div>
      </div>
    </React.Fragment>
  )
}
