/**
 * @file This file contains the converters used to convert different USPTO bulk
 * patent file formats into a single JavaScript object format.
 * 
 * @author Anthony Mancini
 * @version 2.0.0
 * @license AGPLv3
 */

import * as _ from 'lodash';
import { Parser as XmlParser } from 'xml2js';
import { 
  UsptoPatentData, 
  UsptoPatentSchemaData 
} from './interfaces';


/**
 * Converts Version 4 of USPTO Red Book Grant bulk XML data into a JavaScript
 * Object format.
 * 
 * @param xmlData the Version 4 of the bulk Red Book grant data.
 * @returns an array of patent data in the UsptoPatentSchemaData format.
 * 
 * @author Anthony Mancini
 * @version 2.0.0
 * @license AGPLv3
 */
export async function convertUsptoVersion4XmlDataToJs(
  xmlData: string,
) : Promise<UsptoPatentData[]> {

  let patentXmlSectionRegularExpression: RegExp = /[<]us-patent-grant\s.*?[<][/]us-patent-grant[>]/gmis; 
  let patentXmlSections: string[] = xmlData.match(patentXmlSectionRegularExpression);

  // Creating an array of all the patent data in the bulk XML file
  let usptoBulkPatentData: UsptoPatentData[] = [];

  // For each patent section, creating an XML to JavaScript Object parser and
  // parsing the data into a UsptoPatentData structure. After the structure is
  // created, it is added to an array of all the UsptoPatentData
  for (let patentXmlSection of patentXmlSections) {
    let xmlParser: XmlParser = new XmlParser();
    let parsedPatentData: any = await xmlParser.parseStringPromise(patentXmlSection);

    // Creating the UsptoPatentData structure from the 
    let processedPatentData: any = {}

    // The patent application number
    try {
      processedPatentData.applicationNumber = _.trimStart(parsedPatentData['us-patent-grant']['us-bibliographic-data-grant'][0]['publication-reference'][0]['document-id'][0]['doc-number'][0], '0');
    } catch (parsingError) {
      processedPatentData.applicationNumber = null;
    }

    // The patent application type
    try {
      processedPatentData.type = parsedPatentData['us-patent-grant']['us-bibliographic-data-grant'][0]['application-reference'][0]['$']['appl-type'];
    } catch (parsingError) {
      processedPatentData.type = null;
    }

    // The language the patent was filed in
    try {
      processedPatentData.language = parsedPatentData['us-patent-grant']['$']['lang'];
    } catch (parsingError) {
      processedPatentData.language = null;
    }

    // The country of the filer
    try {
      processedPatentData.country = parsedPatentData['us-patent-grant']['$']['country'];
    } catch (parsingError) {
      processedPatentData.country = null;
    }

    // The date the patent was produced
    try {
      processedPatentData.dateProduced = parsedPatentData['us-patent-grant']['$']['date-produced'];
    } catch (parsingError) {
      processedPatentData.dateProduced = null;
    }

    // the date the patent was published
    try {
      processedPatentData.datePublished = parsedPatentData['us-patent-grant']['$']['date-publ'];
    } catch (parsingError) {
      processedPatentData.datePublished = null;
    }

    // A version number for the type of patent
    try {
      processedPatentData.dtdVersion = parsedPatentData['us-patent-grant']['$']['dtd-version'];
    } catch (parsingError) {
      processedPatentData.dtdVersion = null;
    }

    // The name of the associated XML file where the patent XML data 
    // resides
    try {
      processedPatentData.fileName = parsedPatentData['us-patent-grant']['$']['file'];
    } catch (parsingError) {
      processedPatentData.fileName = null;
    }

    // The status of the patent
    try {
      processedPatentData.patentStatus = parsedPatentData['us-patent-grant']['$']['status'];
    } catch (parsingError) {
      processedPatentData.patentStatus = null;
    }

    // A listing of the generic claim of the patent as well as the 
    // individual claims
    try {
      processedPatentData.patentClaims = parsedPatentData['us-patent-grant']['claims'][0]['claim']
        .map(claim => {
          let claimNumber: string = claim['$']['num'].replace(/^0*/, '');
          let claimText: string = ('claim-text' in claim['claim-text'][0]) 
            ? claim['claim-text'][0]['claim-text'].join(' ').trim()
            : claim['claim-text'][0]['_'];

          return { 
            claimNumber: claimNumber, 
            claimText: claimText,
          };
        });
    } catch (parsingError) {
      processedPatentData.patentClaims = null;
    }

    // The formal title of the invention prescribed in the patent
    try {
      processedPatentData.inventionTitle = parsedPatentData['us-patent-grant']['us-bibliographic-data-grant'][0]['invention-title'][0]['_']
    } catch (parsingError) {
      processedPatentData.inventionTitle = null;
    }

    // The ID of the invention of the patent
    try {
      processedPatentData.inventionId = parsedPatentData['us-patent-grant']['us-bibliographic-data-grant'][0]['invention-title'][0]['$']['id'];
    } catch (parsingError) {
      processedPatentData.inventionId = null;
    }

    // The company filing the patent
    try {
      processedPatentData.company = parsedPatentData['us-patent-grant']['us-bibliographic-data-grant'][0]['assignees'][0]['assignee'][0]['addressbook'][0]['orgname'][0];
    } catch (parsingError) {
      processedPatentData.company = null;
    }

    // The applicants filing the patent
    try {
      processedPatentData.applicants = parsedPatentData['us-patent-grant']['us-bibliographic-data-grant'][0]['parties'][0]['applicants'][0]['applicant'].map(applicant => {
        return {
          firstName: applicant['addressbook'][0]['first-name'][0],
          lastName: applicant['addressbook'][0]['last-name'][0],
        };
      });
    } catch (parsingError) {
      processedPatentData.applicants = null;
    }

    usptoBulkPatentData.push(processedPatentData);
  }

  return usptoBulkPatentData;
}


/**
 * Converts Version 2 of USPTO Red Book Grant bulk XML data into a JavaScript
 * Object format.
 * 
 * @param xmlData the Version 2 of the bulk Red Book grant data.
 * @returns an array of patent data in the UsptoPatentSchemaData format.
 * 
 * @author Anthony Mancini
 * @version 2.0.0
 * @license AGPLv3
 */
export async function convertUsptoVersion2XmlDataToJs(
  xmlData: string,
  xmlFileName: string = null,
) : Promise<UsptoPatentData[]> {

  let patentXmlSectionRegularExpression: RegExp = /[<]PATDOC\s.*?[<][/]PATDOC[>]/gmis; 
  let patentXmlSections: string[] = xmlData.match(patentXmlSectionRegularExpression);

  // Creating an array of all the patent data in the bulk XML file
  let usptoBulkPatentData: UsptoPatentData[] = [];

  // For each patent section, creating an XML to JavaScript Object parser and
  // parsing the data into a UsptoPatentData structure. After the structure is
  // created, it is added to an array of all the UsptoPatentData
  for (let patentXmlSection of patentXmlSections) {
    let xmlParser: XmlParser = new XmlParser();
    let parsedPatentData: any;

    // On rare occasions, the Version 2 of the USPTO patent data is not well formatted,
    // and even after corrections fails parsing. In these cases, simply return a
    // blank patent processed object. Note that Version 4 of the data has improved
    // formatting, so this error correction step is omitted in the Version 4 converter
    try {
      parsedPatentData = await xmlParser.parseStringPromise(patentXmlSection.replace(/[&][a-zA-Z0-9]*?[;]/gmi, ''));
    } catch (patentProcessingError) {
      return [{
        applicationNumber: null,
        language: null,
        country: null,
        dateProduced: null,
        datePublished: null,
        dtdVersion: null,
        fileName: null,
        patentStatus: null,
        patentAbstract: null,
        patentClaims: null,
        inventionTitle: null,
        inventionId: null,
        company: null,
        applicants: null,
      }];
    }

    // Creating the UsptoPatentData structure from the 
    let processedPatentData: any = {};

    // The patent application number
    try {
      processedPatentData.applicationNumber = _.trimStart(parsedPatentData['PATDOC']['SDOBI'][0]['B100'][0]['B110'][0]['DNUM'][0]['PDAT'][0], '0');
    } catch (parsingError) {
      processedPatentData.applicationNumber = null;
    }

    // The patent application type
    try {
      processedPatentData.type = null;
    } catch (parsingError) {
      processedPatentData.type = null;
    }

    // The language the patent was filed in
    try {
      processedPatentData.language = null;
    } catch (parsingError) {
      processedPatentData.language = null;
    }

    // The country of the filer
    try {
      processedPatentData.country = parsedPatentData['PATDOC']['SDOBI'][0]['B100'][0]['B190'][0]['PDAT'][0];
    } catch (parsingError) {
      processedPatentData.country = null;
    }

    // The date the patent was produced
    try {
      processedPatentData.dateProduced = parsedPatentData['PATDOC']['SDOBI'][0]['B100'][0]['B140'][0]['DATE'][0]['PDAT'][0];
    } catch (parsingError) {
      processedPatentData.dateProduced = null;
    }

    // the date the patent was published
    try {
      processedPatentData.datePublished = parsedPatentData['PATDOC']['SDOBI'][0]['B200'][0]['B220'][0]['DATE'][0]['PDAT'][0];
    } catch (parsingError) {
      processedPatentData.datePublished = null;
    }

    // A version number for the type of patent
    try {
      processedPatentData.dtdVersion = parsedPatentData['PATDOC']['$']['DTD'];
    } catch (parsingError) {
      processedPatentData.dtdVersion = null;
    }

    // The name of the associated XML file where the patent XML data 
    // resides
    try {
      processedPatentData.fileName = xmlFileName;
    } catch (parsingError) {
      processedPatentData.fileName = null;
    }

    // The status of the patent
    try {
      processedPatentData.patentStatus = parsedPatentData['PATDOC']['$']['STATUS'];
    } catch (parsingError) {
      processedPatentData.patentStatus = null;
    }

    // A listing of the generic claim of the patent as well as the 
    // individual claims
    try {
      processedPatentData.patentClaims = parsedPatentData['PATDOC']['SDOCL'][0]['CL'].map(claim => {
        return {
          claimNumber: _.trimStart(claim['CLM'][0]['$']['ID'].split('-')[1], '0'),
          claimText: claim['CLM'][0]['PARA'][0]['PTEXT'][0]['PDAT'][0],
        };
      });
    } catch (parsingError) {
      processedPatentData.patentClaims = null;
    }

    // The formal title of the invention prescribed in the patent
    try {
      processedPatentData.inventionTitle = parsedPatentData['PATDOC']['SDOBI'][0]['B500'][0]['B540'][0]['STEXT'][0]['PDAT'][0];
    } catch (parsingError) {
      processedPatentData.inventionTitle = null;
    }

    // The ID of the invention of the patent
    try {
      processedPatentData.inventionId = parsedPatentData['PATDOC']['SDOBI'][0]['B500'][0]['B540'][0]['STEXT'][0]['PDAT'][0];
    } catch (parsingError) {
      processedPatentData.inventionId = null;
    }

    // The company filing the patent
    try {
      processedPatentData.company = parsedPatentData['PATDOC']['SDOBI'][0]['B700'][0]['B730'][0]['B731'][0]['PARTY-US'][0]['NAM'][0]['ONM'][0]['STEXT'][0]['PDAT'][0];
    } catch (parsingError) {
      processedPatentData.company = null;
    }

    // The applicants filing the patent
    try {
      processedPatentData.applicants = [{
        firstName: parsedPatentData['PATDOC']['SDOBI'][0]['B700'][0]['B720'][0]['B721'][0]['PARTY-US'][0]['NAM'][0]['FNM'][0]['PDAT'][0],
        lastName: parsedPatentData['PATDOC']['SDOBI'][0]['B700'][0]['B720'][0]['B721'][0]['PARTY-US'][0]['NAM'][0]['SNM'][0]['STEXT'][0]['PDAT'][0],
      }];
    } catch (parsingError) {
      processedPatentData.applicants = null;
    }

    usptoBulkPatentData.push(processedPatentData);
  }

  return usptoBulkPatentData;
}


/**
 * Converts the Pftaps Version of USPTO Red Book Grant bulk TXT data into a JavaScript
 * Object format.
 * 
 * @param pftapsData the Pftaps Version of the bulk Red Book grant data.
 * @returns an array of patent data in the UsptoPatentSchemaData format.
 * 
 * @author Anthony Mancini
 * @version 2.0.0
 * @license AGPLv3
 */
export async function convertUsptoPftapsDataToJs(
  pftapsData: string,
  pftapsFileName: string = null,
) : Promise<UsptoPatentData[]> {

  let patentPftapsSectionRegularExpression: RegExp = /PATN\r\n/gm;
  let patentPftapsSections: string[] = pftapsData.split(patentPftapsSectionRegularExpression);
  patentPftapsSections = patentPftapsSections.slice(1);

  // Creating an array of all the patent data in the bulk XML file
  let usptoBulkPatentData: UsptoPatentData[] = [];

  // For each patent section, creating an XML to JavaScript Object parser and
  // parsing the data into a UsptoPatentData structure. After the structure is
  // created, it is added to an array of all the UsptoPatentData
  for (let patentPftapsSection of patentPftapsSections) {
    // Creating the UsptoPatentData structure from the 
    let processedPatentData: any = {};

    // The patent application number
    try {
      processedPatentData.applicationNumber = _.trimStart(patentPftapsSection.split('\r\n')
      .filter((section: string) => {
        return section.startsWith('PNO  ')
      })[0]
      .split('PNO  ')[1], '0');
    } catch (parsingError) {
      processedPatentData.applicationNumber = null;
    }

    // The patent application typeISD
    try {
      processedPatentData.type = patentPftapsSection.split('\r\n')
        .some((patentLine: string) => /^DCLM\r\n$/.test(patentLine)) === true
        ? 'design'
        : 'utility';
    } catch (parsingError) {
      processedPatentData.type = null;
    }

    // The language the patent was filed in
    try {
      processedPatentData.language = null;
    } catch (parsingError) {
      processedPatentData.language = null;
    }

    // The country of the filer
    try {
      processedPatentData.country = null;
    } catch (parsingError) {
      processedPatentData.country = null;
    }

    // The date the patent was produced
    try {
      processedPatentData.dateProduced = patentPftapsSection.split('\r\n')
        .filter((section: string) => {
          return section.startsWith('APD  ')
        })[0]
        .split('APD  ')[1];
    } catch (parsingError) {
      processedPatentData.dateProduced = null;
    }

    // the date the patent was published
    try {
      processedPatentData.datePublished = patentPftapsSection.split('\r\n')
        .filter((section: string) => {
          return section.startsWith('ISD  ')
        })[0]
        .split('ISD  ')[1];
    } catch (parsingError) {
      processedPatentData.datePublished = null;
    }

    // A version number for the type of patent
    try {
      processedPatentData.dtdVersion = null;
    } catch (parsingError) {
      processedPatentData.dtdVersion = null;
    }

    // The name of the associated XML file where the patent XML data 
    // resides
    try {
      processedPatentData.fileName = pftapsFileName;
    } catch (parsingError) {
      processedPatentData.fileName = null;
    }

    // The status of the patent
    try {
      processedPatentData.patentStatus = null;
    } catch (parsingError) {
      processedPatentData.patentStatus = null;
    }

    // A listing of the generic claim of the patent as well as the 
    // individual claims
    try {
        let claimLines: string[] = patentPftapsSection.split(/(CLMS|DCLM)\r\n/gm)
          .pop()
          .trim()
          .split('\r\n')

        let claimData: {
          claimNumber: string,
          claimText: string,
        }[] = [];
        let claimNumber: string = '1.';
        let accumulatedClaimLine: string = '';

        for (let claimLine of claimLines) {
          if (/^NUM\s{2}[0-9]{1,}[.]$/.test(claimLine)) {
            if (accumulatedClaimLine !== '') {
              claimData.push({ 
                claimNumber: _.trimEnd(claimNumber, '.').trim(),
                claimText: accumulatedClaimLine.trim(),
              });
            }

            claimNumber = claimLine.split('  ')[1].trim();
            accumulatedClaimLine = '';

            continue;
          }

          if (/^STM\s{2}/.test(claimLine)) {
            continue;
          }

          accumulatedClaimLine += claimLine.replace(/(^PAR\s{2}[0-9]{1,}[.])|(^(PA1|PAR|PAL)\s{2})/, '').trim() + ' ';

          if (claimLines.length === 1) {
            claimData.push({ 
              claimNumber: _.trimEnd(claimNumber, '.').trim(),
              claimText: accumulatedClaimLine.trim(),
            });
          }
        }

      processedPatentData.patentClaims = claimData;
    } catch (parsingError) {
      processedPatentData.patentClaims = null;
    }

    // The formal title of the invention prescribed in the patent
    try {
      processedPatentData.inventionTitle = patentPftapsSection.split('\r\n')
        .filter((section: string) => {
          return section.startsWith('TTL  ')
        })[0]
        .split('TTL  ')[1];
    } catch (parsingError) {
      processedPatentData.inventionTitle = null;
    }

    // The ID of the invention of the patent
    try {
      processedPatentData.inventionId = patentPftapsSection.split('\r\n')
        .filter((section: string) => {
          return section.startsWith('ISD  ')
        })[0]
        .split('ISD  ')[1];
    } catch (parsingError) {
      processedPatentData.inventionId = null;
    }

    // The company filing the patent
    try {
      processedPatentData.company = null
    } catch (parsingError) {
      processedPatentData.company = null;
    }

    // The applicants filing the patent
    try {
      let applicantName: string = patentPftapsSection.split('INVT')[1]
        .split('CTY  ')[0]
        .trim()
        .split('NAM  ')[1];

      let firstName: string = applicantName.split(';')[1].trim();
      let lastName: string = applicantName.split(';')[0].trim(); 

      processedPatentData.applicants = [{
        firstName: firstName,
        lastName: lastName,
      }];
    } catch (parsingError) {
      processedPatentData.applicants = null;
    }

    usptoBulkPatentData.push(processedPatentData);
  }

  return usptoBulkPatentData;
}