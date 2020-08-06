

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;

public class DataProcessor {

	public static void main(String[] args) {
		String varNm = "var rawData='";
		String delimiter = "'\n+'\\n";
		
		String input = "data.csv";
		String output = "data.csv.js";
		if(args.length > 0) {
			input = args[0];
		}
		try {
			BufferedReader reader = new BufferedReader(new FileReader(input));
			PrintWriter writer = new PrintWriter(output);
			String line = reader.readLine();
			int count = 0;
			while(line != null) {
				if(count == 0) {
					writer.print(varNm);
				}else {
					writer.print(delimiter);
				}
				
				writer.print(line);
				count ++;
				line = reader.readLine();
			}
			if(count > 0) {
				writer.print("';\n");
			}
			reader.close();
			writer.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
