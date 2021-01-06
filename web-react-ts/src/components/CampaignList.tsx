import React from 'react'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  SortDirection,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  TextField,
} from '@material-ui/core'
import { useQuery, gql } from '@apollo/client';

import Title from './Title'

const styles = (theme: Theme) => createStyles({
  root: {
    minWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
})

const GET_CAMPAIGN = gql`
  query campaignPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_CampaignOrdering]
    $filter: _CampaignFilter
  ) {
    Campaign(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      name
      dm {
        name
      }
      characters {
        name
        alive
      }
    }
  }
`

function CampaignList(props: any) {
  const { classes } = props
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(10)
  const [filterState, setFilterState] = React.useState({ usernameFilter: '' })

  const getFilter = () => {
    return filterState.usernameFilter.length > 0
      ? { name_contains: filterState.usernameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_CAMPAIGN, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
      filter: getFilter(),
    },
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

  const handleFilterChange = (filterName: any) => (event: any) => {
    const val = event.target.value

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterName]: val,
    }))
  }

  const deathCount = (characterArry: any) => {
    var deathCount = 0

    console.log(characterArry)

    characterArry.map((n: any) => {
      if (n.alive === 'No') {
        deathCount += 1
      }})

    return deathCount
  }

  return (
    <Paper className={classes.root}>
      <Title>Player List</Title>
      <TextField
        id="search"
        label="Campaign Name Contains"
        className={classes.textField}
        value={filterState.usernameFilter}
        onChange={handleFilterChange('usernameFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
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
                key="dm"
                sortDirection={orderBy === 'dm' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'dm'}
                    direction={order}
                    onClick={() => handleSortRequest('dm')}
                  >
                    Dungeon Master
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="characters"
                sortDirection={orderBy === 'characters' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'characters'}
                    direction={order}
                    onClick={() => handleSortRequest('characters')}
                  >
                    Character Count
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="death"
                sortDirection={orderBy === 'death' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'death'}
                    direction={order}
                    onClick={() => handleSortRequest('death')}
                  >
                    Death Count
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Campaign.map((n: any) => {
              return (
                <TableRow key={n.name}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.dm[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.characters.length}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {deathCount(n.characters)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default withStyles(styles)(CampaignList)
