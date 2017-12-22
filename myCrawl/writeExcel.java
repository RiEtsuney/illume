package myCrawl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class writeExcel {

	public static void write(ArrayList<String> information, int count)
	{
		String file_name = "F:\\Downloads-PC\\business.xlsx";
		String sheetName = "Sheet1";
		
		SXSSFWorkbook workbook = null; 
        try {  
        	//sxssf set sliding window to 10£¬keep 10 lines in memory at most
            workbook = new SXSSFWorkbook(new XSSFWorkbook(new FileInputStream(new File(file_name))), 10);  
        } catch (FileNotFoundException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        //flow
        FileOutputStream out = null;  
        SXSSFSheet sheet = workbook.getSheet(sheetName);  
        // get row count
        int rowCount = count - 1;
        /*
        int rowCount = 0;
        if(count != 1)
        {
        	//if use sxssf
        	rowCount = sheet.getLastRowNum() + 1;
        }
        */
        // set column count  
        int columnCount = 6;
        try {  
            SXSSFRow row = sheet.createRow(rowCount);     //the latest row to be added  
            SXSSFCell cell_ID = row.createCell(0);  
            cell_ID.setCellValue(Integer.toString(count));  
        	
            for(int columnIndex=1; columnIndex<columnCount; columnIndex++) 
            {    
            	SXSSFCell cell = row.createCell(columnIndex); 
            	if(information.get(columnIndex-1).length() <= 32767)
            	{
            		cell.setCellValue(information.get(columnIndex-1)); 
            	}
            	else
            	{
            		cell.setCellValue(information.get(columnIndex-1).substring(0, 32766)); 
            	}
            }  
  
            out = new FileOutputStream(file_name);  
            workbook.write(out);  
            System.out.println("Write entry " + Integer.toString(count) + "!");
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {    
            try {    
                out.close();    
            } catch (IOException e) {    
                e.printStackTrace();  
            }    
        }    
	}
	
	public static void main(String[] args) throws Exception 
    {

    	ArrayList<String> entry = new ArrayList<String>();
    	entry.add("12312312");
    	entry.add("hhh");
    	entry.add("cacaca");
    	entry.add("12312312312321312");
    	entry.add("cool");
    	entry.add("final");
    	writeExcel.write(entry, 1);
    	writeExcel.write(entry, 2);
    	writeExcel.write(entry, 3);
    	
    }
	
}
