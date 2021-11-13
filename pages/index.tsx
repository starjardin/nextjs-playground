import * as React from 'react';
import Link from 'next/link'
export default function App(props) {
  return (
    <div className="row">
      <div className="medium-6 column" style={{width: "95%"}}>
        <Link href="/images">Images</Link>
      </div>
    </div>
  )
}
