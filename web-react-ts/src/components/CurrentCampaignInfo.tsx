import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  Table,
  TableBody,
  TableCell,
  SortDirection,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'
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
  table: {
  },
})

const GET_CURRENT_CAMPAIGN = gql`
  query GetCurrentCampaign($current: String!) {
    Campaign(current: $current) {
      name
      current
      dm {
        name
      }
      characters {
        name
        level
        player {
          name
        }
        race {
          name
        }
        class {
          name
        }
      }
    }
  }
`

export default function CurrentCampaignInfo() {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_CURRENT_CAMPAIGN, {
    variables: { current: 'Yes' }
  })

  const handleSortRequest = (property: any) => {
    const newOrderBy = property
    let newOrder: SortDirection = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Current Campaign: {loading ? 'Loading...' : data.Campaign[0].name} DMed By {loading ? 'Loading...' : data.Campaign[0].dm[0].name}</Title>
      <Typography component="p" >
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur odio quis lectus aliquet, et convallis arcu gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent sit amet tristique massa. Suspendisse id viverra mauris. Donec et est quis justo viverra sodales eu quis risus. Ut pellentesque eleifend dapibus. Proin cursus lobortis tincidunt.'}
      </Typography>
      <br/>
      <Typography component="p" variant="h6">
        {'The current team:'}
      </Typography>

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                key="name"
                sortDirection={orderBy === 'name' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={order}
                    onClick={() => handleSortRequest('name')}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="player"
                sortDirection={orderBy === 'player' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'player'}
                    direction={order}
                    onClick={() => handleSortRequest('player')}
                  >
                    Player
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="class"
                sortDirection={orderBy === 'class' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'class'}
                    direction={order}
                    onClick={() => handleSortRequest('class')}
                  >
                    Class
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="race"
                sortDirection={orderBy === 'race' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'race'}
                    direction={order}
                    onClick={() => handleSortRequest('race')}
                  >
                    Race
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="level"
                sortDirection={orderBy === 'level' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'level'}
                    direction={order}
                    onClick={() => handleSortRequest('level')}
                  >
                    Level
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Campaign[0].characters.map((n: any) => {
              return (
                <TableRow key={n.name}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.player[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.race[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.class[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.level}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

    </React.Fragment>
  )
}
