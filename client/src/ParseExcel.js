import React, { useState } from 'react'
import {Input,Card,CardHeader,CardBody,Row,Col,Table, Label} from 'reactstrap'
import ExcelImportTool from './ExcelImportTool'
const ParseExcel = () => {
    const [sheetData,setSheetData] = useState(null)
    const [sheet,setSheet]= useState(null)

    //[Header]
    //{DAta}
    const handleFileUpload=(e)=>{
        console.log("File Uploaded",e)
        if(e){
            setSheet(Object.keys(e)[0])}
        setSheetData(e)
    }
  return (
    <>
    <div className="content">
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader>
                        <h5 className="title">Read Excel Sheets</h5>
                        <p className="category"></p>
                    </CardHeader>
                    <CardBody className="all-icons">
                        <ExcelImportTool onFileUploaded={(e)=>handleFileUpload(e)}/>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        {sheetData &&
        <Row>
            <Label>{sheet}</Label>
            <Col md={12}>
                <Table bordered >
                    <thead className='text-primary'>
                       <tr>
                        {sheetData[sheet][0].map(h=><th key={h}>{h}</th>)}
                        </tr>
                   
                    </thead>
                    <tbody>
                    {sheetData[sheet].slice(1).map((row)=>
                    <tr key={row}>
                        {row.map(c=><td>{c}</td>)}</tr>)}
                    </tbody>
                </Table>
            </Col>
        </Row>}
    </div>
    </>
  )
}

export default ParseExcel