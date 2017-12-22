package myCrawl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

public class linkCrawler {
	public static ArrayList<String> getLinks(String startLink) throws IOException
	{
		ArrayList<String> links = new ArrayList<String>();
		Document startPage = Jsoup.connect(startLink).get();
		
		
		
		Elements temp_links = startPage.getElementsByTag("a");
		for(Element temp_link : temp_links)
		{
			if(temp_link.parent().hasAttr("valign"))
			{
				String temp = "http://patft.uspto.gov" + temp_link.attr("href");
				if(!links.contains(temp))
				{
					links.add(temp);
				}
			}
		}
		
		String nextList = "http://patft.uspto.gov" + startPage.getElementsByAttributeValue("ALT", "[NEXT_LIST]").first().parent().attr("href");
		Document nextPage = null;
		while(!nextList.equals("http://patft.uspto.gov"))
		{
			nextPage = Jsoup.connect(nextList).get();
			
			temp_links = nextPage.getElementsByTag("a");
			for(Element temp_link : temp_links)
			{
				if(temp_link.parent().hasAttr("valign"))
				{
					String temp = "http://patft.uspto.gov" + temp_link.attr("href");
					if(!links.contains(temp))
					{
						links.add(temp);
					}
				}
			}
			
			nextList = "http://patft.uspto.gov";
			if(!nextPage.getElementsByAttributeValue("ALT", "[NEXT_LIST]").isEmpty())
			{
				nextList = nextList + nextPage.getElementsByAttributeValue("ALT", "[NEXT_LIST]").first().parent().attr("href");
			}
		}
		
		return links;
	}
	
	public static void main(String[] args) throws Exception 
    {
		
		String startLink = "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&p=1&u=%2Fnetahtml%2FPTO%2Fsearch-bool.html&r=0&f=S&l=50&TERM1=animal&FIELD1=TI&co1=AND&TERM2=toy&FIELD2=TI&d=PTXT";
		getLinks(startLink);
    }

}
