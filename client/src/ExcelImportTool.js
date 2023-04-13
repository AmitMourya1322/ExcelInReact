import React, { useState,useRef } from 'react'
import {Row,Col,Label} from 'reactstrap'
import * as  XLSX from "xlsx"
const ExcelImportTool = (props) => {
    const [file,setFile] = useState(null)
    const[fileName,setFileName]= useState(null)
    const fileRef = useRef()
    const acceptableFileName = ["xlsx","xls"]
    const [SheetNames,setSheetNames]= useState([])
    const [sheetData,setSheetData] = useState({})
const readDataFromExcel =(data)=>{
    const wb = XLSX.read(data)
    // const wb = XLSX.read(data, { type: "array" });
    setSheetNames(wb.SheetNames)

    var mySheetData= {}
    //loop through sheets

    for(var i=0;i<wb.SheetNames.length;i++){
        let sheetName = wb.SheetNames[i]
        const worksheet = wb.Sheets[sheetName]
        const  jsonData = XLSX.utils.sheet_to_json(worksheet,{
            blankrows:"",
            header:1,
        })

        mySheetData[sheetName]=jsonData
        console.log(sheetName)
    }
    setSheetData(mySheetData)
    
    console.log(mySheetData)
    console.log(wb)
    return mySheetData
    
}
    //File Extension
    const checkerFileName = (name)=>{
        return acceptableFileName.includes(name.split(".").pop().toLowerCase())
    }

    const handleFile=async(e)=>{
        const myFile = e.target.files[0];
        if(!myFile) return;
        if(!checkerFileName(myFile.name)){
            alert("Invalid File Name")
            return
        }
        //read the xlsx mdata
        const data = await myFile.arrayBuffer();
       const mySheetData= readDataFromExcel(data)
        setFile(myFile)
        setFileName(myFile.name)
        props.onFileUploaded(mySheetData)
    }

    const handleRemove =()=>{
        setFile(null)
        setFileName(null)
        setSheetNames([])
        setSheetData(null)
        props.onFileUploaded(null)
        fileRef.current.value=""
        
    }
  return (
    <Row>
        <Col>
        <div className="mb-2">
            {fileName && <Label>File Name is : {fileName}</Label>}
            {!fileName && <Label>Please Upload a File</Label>}
        </div>
            <div className="h">
                <input type="file" ref={fileRef} accept='xlsx,xls' multiple={false}
                onChange={(e)=>handleFile(e)} />
                {fileName && (
                    <i className='now-ui-icons ui-l_simple_remove align-middle'
                     onClick={handleRemove}>X</i>
                )}
            </div>
        </Col>
    </Row>
  )
}

export default ExcelImportTool