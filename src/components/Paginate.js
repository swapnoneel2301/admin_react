import React from 'react';

export default function Paginate({noOfPages,currentPage,setCurrentPage}){
    return (
               noOfPages>0 &&
                <ul className="pagination justify-content-center fw-bold">
                        <li className={`page-item ${currentPage===1?'disabled':''}`}><a className="page-link" href="#" onClick={()=>setCurrentPage(1)}>{'<<'}</a></li>
                        <li className={`page-item ${currentPage===1?'disabled':''}`}><a className="page-link" href="#" onClick={()=>setCurrentPage(currentPage-1)}>{'<'}</a></li>
                        {
                            Array(noOfPages).fill(0).map((ele,index)=>{
                                return <li className={`page-item ${index+1===currentPage?'active':''}`} key={index} onClick={()=>setCurrentPage(index+1)}><a className="page-link" href="#">{index+1}</a></li>
                            })
                        }
                        <li className={`page-item ${currentPage===noOfPages?'disabled':''}`}><a className="page-link" href="#" onClick={()=>setCurrentPage(currentPage+1)}>{'>'}</a></li>
                        <li className={`page-item ${currentPage===noOfPages?'disabled':''}`}><a className="page-link" href="#" onClick={()=>setCurrentPage(noOfPages)}>{'>>'}</a></li>
                </ul>
    )
}