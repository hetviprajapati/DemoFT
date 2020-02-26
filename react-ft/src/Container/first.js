import React, {Component} from 'react';

let PDFJS = require('pdfjs-dist');
let worker=require('pdfjs-dist/build/pdf.worker.entry');


class First extends Component {

    load=async ()=>{
        debugger;

       const pdfUrl ='https://test-uk.rioft.com/api/quotePrint/33464?&salesPerson=14&token=5e54bc2e584bf&&site=test-uk.rioft.com&debug=undefined&superToken=5e54bc2e58872'

        PDFJS.GlobalWorkerOptions.workerSrc = worker;
        let loadingTask =await PDFJS.getDocument(pdfUrl);
        let maxPage=loadingTask._pdfInfo.numPages;
         for (let i=1;i<=maxPage;i++)
        {
            let pdfPage=await loadingTask.getPage(i)
            let textContent=await pdfPage.getTextContent();

            let textItems = textContent.items;
            let finalString = "";
            for (let i = 0; i < textItems.length; i++) {
                let item = textItems[i];

                finalString += item.str + " ";
            }
            alert(finalString);
        }
    }

    render() {
        return (
            <div>
                <input type='file' name='file'  onChange={this.getVal}/>
             <button onClick={this.load}>Click me</button>
            </div>
        );
    }
}

export default First;