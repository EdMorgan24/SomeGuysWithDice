import React from 'react'
import { Link } from 'react-router-dom'
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
    characterCount
    characterDeathCount
  }
`

export default function CharacterCount() {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_COUNT_QUERY)
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Total Characters</Title>
      <Typography component="p" variant="h4">
        {loading ? 'Loading...' : data.characterCount}
      </Typography>
      <Title>Characters Stats</Title>
      <div>
        <div className={classes.aliveCharacters}>
          <Typography component="p" variant="h4">
            {loading ? 'Loading...' : data.characterCount - data.characterDeathCount }
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Alive characters
          </Typography>
        </div>
        <div>
          <Typography component="p" variant="h4">
            {loading ? 'Loading...' : data.characterDeathCount }
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Dead characters
          </Typography>
        </div>
      </div>
      <br/>
      <div>
        <Link to="/characters" className={classes.navLink}>
          View characters
        </Link>
      </div>
    </React.Fragment>
  )
}
