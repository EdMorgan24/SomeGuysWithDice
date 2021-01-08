import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useQuery, gql } from '@apollo/client'

const GET_DATA_QUERY = gql`
  {
    classCount {
      name
      count
    }
  }
`
export default function ClassChart() {

  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <ResponsiveContainer width="95%" height={300}>
      <BarChart
              width={1000}
              height={300}
              data={data.classCount}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="0 0" />
              <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
              <YAxis allowDecimals={false}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
