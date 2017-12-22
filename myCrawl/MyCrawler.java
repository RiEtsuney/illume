package myCrawl;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


public class MyCrawler 
{
	private static void doCrawl(File input, int count) throws IOException
    {
    	Document doc = Jsoup.parse(input,"UTF-8");
        
    	/*find patent name*/
    	Elements patent_names = doc.getElementsByAttributeValue("name", "DC.title");
    	String patent = null;
    	for(Element patent_name : patent_names)
    	{
    		patent = patent_name.attr("content");
    		System.out.println(patent);
    	}
        /*find contributor*/
    	Elements names = doc.getElementsByAttributeValue("scheme", "inventor");
    	String inventor = null;
    	for(Element name : names)
    	{
    		inventor = name.attr("content");
    		System.out.println(inventor);
    	}
    	/*crawl patent number and Fee status*/
    	Elements titles = doc.getElementsByAttributeValue("name", "title");
    	String patent_no = null;
    	for(Element title : titles)
    	{
    		patent_no = title.attr("content").substring(7,16);
    		System.out.println(patent_no);
    	}
    	Elements tds = doc.getElementsByTag("td");
    	String fee_status = null;
    	boolean flag = false;
    	for(Element td : tds)
    	{
    		if(flag == true)
    		{
    			fee_status = td.text();
        		System.out.println(fee_status);
        		break;
    		}
    		String temp = td.text();
    		if(temp.equals("Fee status"))
    		{
    			flag = true;
    		}
    	}
    	/*crawl abstract*/
    	Elements descriptions = doc.getElementsByAttributeValue("name", "description");
    	String Abstract = null;
    	for(Element description : descriptions)
    	{
    		Abstract = description.attr("content");
    		System.out.println(Abstract);
    	}
    	/*crawl claim*/
    	Elements claim_texts = doc.getElementsByClass("claim-text");
    	String claim = "";
    	for(Element claim_text : claim_texts)
    	{
    		claim = claim + claim_text.text() + " ";
    	}
    	System.out.println(claim);

    }	        
	
	
	
    public static void main(String[] args) throws Exception 
    {
		
		String filename = "/Users/apple/Desktop/Tutorial/Patent US6360693 - Animal toy - Google Patents.htm";
		File input = new File(filename);
		doCrawl(input, 1);
    }
}
