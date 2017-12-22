package myCrawl;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;


public class PatentCrawler 
{
	private static ArrayList<String> doCrawl(String link) throws IOException
    {
    	//Document doc = Jsoup.parse(input,"UTF-8");
		Document doc = Jsoup.connect(link).get();
        ArrayList<String> information = new ArrayList<String>();
		
        /*find patent application no*/
        Elements patent_nos = doc.getElementsByTag("b");
    	String patent = "";
    	int num = 0;
    	for(Element patent_no : patent_nos)
    	{
    		num++;
    		String temp = patent_no.text();
    		if(temp.contains("United States Patent"))
    		{
    			//patent = temp + " " + patent_nos.eq(num).text();
    			patent = patent_nos.eq(num).text();
    			break;
    		}
	    	
    	}
    	num = 0;
    	if(patent.equals(""))
    	{
    		patent = "No such a field";
    	}
    	if(patent.startsWith("D"))
    	{
    		System.out.println("This is a design patent.");
    		return null;	
    	}
    	//System.out.println(patent);
    	information.add(patent);
    	
        /*find patent title*/
    	String patent_title = "";
    	Elements patent_titles = doc.getElementsByAttributeValue("size", "+1");
    	for(Element title : patent_titles)
    	{
    		patent_title = title.text();
    	}
    	//System.out.println(patent_title);
    	if(patent_title.equals(""))
    	{
    		patent_title = "No such a field";
    	}
    	information.add(patent_title);
    	
    	/*find contributor*/
    	Elements inventors = doc.select("th, td");
    	String patent_inventor = "";
    	for(Element inventor : inventors)
    	{
    		num++;
    		String temp = inventor.text();
    		if(temp.contains("Inventors"))
    		{
    			patent_inventor = inventors.eq(num).text();
    			break;
    		}
    	}
    	num = 0;
    	//System.out.println(patent_inventor);
    	if(patent_inventor.equals(""))
    	{
    		patent_inventor = "No such a field";
    	}
    	information.add(patent_inventor);
    	
        /*find abstract*/
    	Elements abstracts = doc.select("center, p");
    	String patent_abs = "";
    	for(Element abs : abstracts)
    	{
			num++;
    		String temp = abs.text();
    		if(temp.contains("Abstract"))
    		{
    			patent_abs = abstracts.eq(num).text();
    			break;
    		}
    	}
    	num = 0;
    	//System.out.println(patent_abs);
    	if(patent_abs.equals(""))
    	{
    		patent_abs = "No such a field";
    	}
    	information.add(patent_abs);
    	
        /*find claim*/
    	Elements claims = doc.getElementsByTag("hr");
    	String patent_claim = "";
    	boolean flag = false;
    	for(Element claim : claims)
    	{
    		Element temp = claim.nextElementSibling();
    		if(flag == true)
    		{
    			Node temp2 = claim.nextSibling();
    			while(!temp2.nodeName().equals("hr"))
    			{
    				if(!temp2.nodeName().equals("br"))
    				{
    					patent_claim = patent_claim + temp2.toString();
    				}
    				temp2 = temp2.nextSibling();
    			}
    			flag = false;
    			break;
    		}
    		if(temp.text().contains("Claims"))
    		{
    			flag = true;
    		}
    	}
       	//System.out.println(patent_claim);
    	if(patent_claim.equals(""))
    	{
    		patent_claim = "No such a field";
    	}
    	information.add(patent_claim);
    	
        /*image hyperlink£¬if the patent design is in the form of image without abstract*/
    	/*
       	Elements image_links = doc.getElementsByTag("img");
       	String patent_image = "";
       	for(Element image_link : image_links)
       	{
       		if(image_link.attr("alt").equals("[Image]"))
       		{
       			patent_image = image_link.parent().attr("href");
       			break;
       		}
       	}
       	if(patent_image.equals(""))
    	{
    		patent_image = "No such a field";
    	}
       	information.add(patent_image);
       	//System.out.println(patent_image);
       	 * 
       	 */
       	return information;
       	
    }	        
	
	
	
    public static void main(String[] args) throws Exception 
    {
		/*
		String filename = "/Users/apple/Desktop/Tutorial/United States Patent_ 9301504.html";
		File input = new File(filename);
		doCrawl(input, 1);
		*/
    	String startLink = "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&f=S&l=50&d=PTXT&RS=TTL%2FHome&Refine=Refine+Search&Query=TTL%2FHome+ANDNOT+TTL%2Fmethod+ANDNOT+TTL%2Fcommunication";
    	ArrayList<String> links = linkCrawler.getLinks(startLink);
    	System.out.println(links.size() + " patents!");
    	ArrayList<String> entry = new ArrayList<String>();
    	int count = 1;
    	for(String link : links)
    	{
    		/*
    		int djc=1536;
    		if(links.indexOf(link) < djc)
    		{
    			continue;
    		}
    		if(links.indexOf(link) == djc)
    		{
    			count = 1501;
    		}
    		*/
    		
    		System.out.println("Processing link " + (links.indexOf(link)+1));
    		
    		entry = doCrawl(link);
    		if(entry != null)
    		{
    			writeExcel.write(entry, count);
    			count++;
    		}
    		if(count > 1500)
    		{
    			break;
    		}
    	}
    }
}
