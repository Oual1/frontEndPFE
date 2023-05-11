import React from 'react'
import ViewHeader from './ViewHeader'
import ViewDetail from './ViewDetail'
import ViewFooter from './ViewFooter'

function ViewFile() {
  return (
    <div>
        <ViewHeader></ViewHeader>
        <ViewDetail></ViewDetail>
        <ViewFooter></ViewFooter>
    </div>
  )
}

export default ViewFile;