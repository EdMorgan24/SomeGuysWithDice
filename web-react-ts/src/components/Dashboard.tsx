import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import CurrentCampaignInfo from './CurrentCampaignInfo'
import CharacterCount from './CharacterCount'
import OneShotStats from './OneShotStats'
import ClassStats from './ClassStats'
import RaceStats from './RaceStats'
export default function Dashboard() {
  const theme = useTheme()

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 300,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Ratings Chart */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <CurrentCampaignInfo />
          </Paper>
        </Grid>
        {/* Character Count */}
        <Grid item xs={12} md={1} lg={4}>
          <Paper className={fixedHeightPaper}>
            <CharacterCount />
          </Paper>
        </Grid>
        {/* One Shot Count */}
        <Grid item xs={12} md={1} lg={4}>
          <Paper className={fixedHeightPaper}>
            <OneShotStats />
          </Paper>
        </Grid>
        {/* Recent Reviews */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              <ClassStats />
              <RaceStats />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
