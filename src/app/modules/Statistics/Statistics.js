import React from 'react'
import  './Statistics.css'


function Statistics() {
  return (
    <>
    <div className="container-fluid Mincontainer">
    <h1 className='Statistics'> Statistics</h1>
                  <div className="row">
                   
                    <div className="main-content">
                        <div className="header bg-gradient-primary">
                            <div className="container-fluid">
                                <div className="header-body">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-6">
                                            <div className="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Users</h5>
                                                            <span className="h2 font-weight-bold mb-0">{ 0}</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i className="fas fa-users"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span className="text-nowrap"> Total Users</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-lg-6">
                                            <div className="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Utilities</h5>
                                                            <span className="h2 font-weight-bold mb-0">{ 0}</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i className="fas fa-list"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span className="text-nowrap"> Total WatchList</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-lg-6">
                                            <div className="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Users Utilities</h5>
                                                            <span className="h2 font-weight-bold mb-0">{ 0}</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i className="fas fa-th-list"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span className="text-nowrap"> Total Search</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-lg-6">
                                            <div className="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded" >
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Services</h5>
                                                            <span className="h2 font-weight-bold mb-0">{ 0}</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i className="fas fa-cog"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span className="text-nowrap"> Total Cinema</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>





                                        <div className="col-xl-3 col-lg-6">
                                            <div className="card card-stats mb-4 mb-xl-0 mm shadow p-3 mb-5 bg-body rounded"  >
                                                <div className="card-body" >
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Digital Assistance</h5>
                                                            <span className="h2 font-weight-bold mb-0">{ 0}</span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i className="fas fa-user-o"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 12%</span>
                                                        <span className="text-nowrap"> Total Digital Assistance </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
    
    </>
  )
}

export default Statistics