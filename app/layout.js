import { MyProvider } from "@/context/Context";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Nasa App",
	description: "Show different photos from NASA API",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<MyProvider>{children}</MyProvider>
			</body>
		</html>
	);
}
