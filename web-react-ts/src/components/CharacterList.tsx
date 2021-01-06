import React from 'react'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckIcon from '@material-ui/icons/Check';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
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

const GET_CHARACTER = gql`
  query charactersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_CharacterOrdering]
    $filter: _CharacterFilter
  ) {
    Character(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      name
      level
      alive
      player {
        name
      }
      campaign {
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
`

function CharacterList(props: any) {
  const { classes } = props
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filterState, setFilterState] = React.useState({ usernameFilter: '' })

  const getFilter = () => {
    return filterState.usernameFilter.length > 0
      ? { name_contains: filterState.usernameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_CHARACTER, {
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAliveOrDead = (alive: any) => {
    if(alive === 'Yes') {
      return <CheckIcon/>
    }
    else {
      return <ErrorOutlineIcon/>
    }
  }

  return (
    <Paper className={classes.root}>
      <Title>Character List</Title>
      <TextField
        id="search"
        label="Character Name Contains"
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
                key="campaign"
                sortDirection={orderBy === 'campaign' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'campaign'}
                    direction={order}
                    onClick={() => handleSortRequest('campaign')}
                  >
                    Campaign
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
                key="alive"
                sortDirection={orderBy === 'alive' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'alive'}
                    direction={order}
                    onClick={() => handleSortRequest('alive')}
                  >
                    Alive
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Character.map((n: any) => {
              return (
                <TableRow key={n.name}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.player[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.campaign[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.level}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.race[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.class[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {handleAliveOrDead(n.alive)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default withStyles(styles)(CharacterList)
