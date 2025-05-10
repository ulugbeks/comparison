import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileCode, Download, Copy } from 'lucide-react';

const XmlDocsPage: React.FC = () => {
  const { t } = useTranslation();

  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <id>12345</id>
    <name>Sample Product Name</name>
    <description>Detailed product description</description>
    <price>999000</price>
    <currency>UZS</currency>
    <category>Electronics</category>
    <subcategory>Smartphones</subcategory>
    <brand>Samsung</brand>
    <model>Galaxy S21</model>
    <stock>10</stock>
    <images>
      <image>https://example.com/image1.jpg</image>
      <image>https://example.com/image2.jpg</image>
    </images>
    <specifications>
      <spec>
        <name>Display</name>
        <value>6.2 inch AMOLED</value>
      </spec>
      <spec>
        <name>RAM</name>
        <value>8GB</value>
      </spec>
    </specifications>
  </product>
</products>`;

  const copyXml = () => {
    navigator.clipboard.writeText(sampleXml);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <FileCode size={24} className="text-primary-500 mr-2" />
              <h1 className="text-2xl font-bold">XML Feed Documentation</h1>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="mb-4">
                To list your products on Elkor.uz, you need to provide a product feed in XML format.
                The feed should be accessible via a public URL and updated at least once per day.
              </p>

              <h2 className="text-xl font-semibold mb-4">XML Structure</h2>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                <button
                  onClick={copyXml}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                  title="Copy XML"
                >
                  <Copy size={20} />
                </button>
                <pre className="text-gray-100 overflow-x-auto">
                  {sampleXml}
                </pre>
              </div>

              <h2 className="text-xl font-semibold mb-4">Field Descriptions</h2>
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Field</th>
                    <th className="px-4 py-2 text-left">Required</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-medium">id</td>
                    <td className="px-4 py-2">Yes</td>
                    <td className="px-4 py-2">Unique product identifier</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">name</td>
                    <td className="px-4 py-2">Yes</td>
                    <td className="px-4 py-2">Product name</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">price</td>
                    <td className="px-4 py-2">Yes</td>
                    <td className="px-4 py-2">Price in UZS (no decimals)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">category</td>
                    <td className="px-4 py-2">Yes</td>
                    <td className="px-4 py-2">Main category name</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">images</td>
                    <td className="px-4 py-2">Yes</td>
                    <td className="px-4 py-2">At least one image URL required</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-xl font-semibold mb-4">Integration Steps</h2>
              <ol className="list-decimal pl-6 mb-6">
                <li className="mb-2">Create an XML feed following the structure above</li>
                <li className="mb-2">Host the XML file on your server with public access</li>
                <li className="mb-2">Submit the feed URL in your shop dashboard</li>
                <li className="mb-2">Update your feed at least once every 24 hours</li>
              </ol>

              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-primary-900 mb-2">Need Help?</h3>
                <p className="text-primary-800">
                  If you need assistance with your XML feed, contact our support team at{' '}
                  <a href="mailto:support@elkor.uz" className="text-primary-600 hover:text-primary-700">
                    support@elkor.uz
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="/sample-feed.xml"
                download
                className="btn btn-primary flex items-center"
              >
                <Download size={20} className="mr-2" />
                Download Sample XML
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XmlDocsPage;