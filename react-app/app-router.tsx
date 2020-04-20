import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { VideoConverterView } from './views/video-converter/video-converter.view'

export function AppRouter () {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' exact component={VideoConverterView} />
      </Switch>
    </HashRouter>
  )
}
