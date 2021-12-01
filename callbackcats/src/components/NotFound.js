const NotFound = props => {
  return (
    <div className="App">
      <div style={{ margin: '0 auto', padding: '1.5em' }}>
      </div>

      <div className="centered" style={{ width: '700px', height: "500px", margin: '0 auto' }}>
        <div style={{ float: "left" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" class="bi bi-exclamation-octagon" viewBox="0 0 16 16">
            <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
        </div>

        <div style={{ float: "right", margin: "20px" }}>
          <h3><strong> 404 </strong> | The page you requested was not found</h3>
          <a href={`/menu`} style={{ textDecoration: 'none' }}>Go back to the menu.</a>
        </div>
      </div>
    </div>
  )
}

export default NotFound;