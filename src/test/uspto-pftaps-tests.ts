/**
 * @file This file unit tests for the USPTO patent converter code for the Pftaps version
 * of the USPTO patent data.
 * 
 * @author Anthony Mancini
 * @version 2.0.0
 * @license AGPLv3
 */

import * as fs from 'fs';
import * as path from 'path';
import test from 'ava';
import * as converters from './../converters';
import { UsptoPatentData } from '../interfaces';


test.before(async (avaTest: any) => {
  // Getting the sample data from the sample data folder
  const usptoPftapsFilePath: string = path.join(__dirname, '../../samples/usptoPftaps.txt');
  const usptoPftapsDataSample: string = fs.readFileSync(usptoPftapsFilePath).toString();

  // Converting the sample data into a unified format
  const usptoPftapsDataArray: UsptoPatentData[] = await converters.convertUsptoPftapsDataToJs(usptoPftapsDataSample);

  // Getting the first value from the array as there is only a single patent sample within the
  // sample file
  const usptoPftapsData: UsptoPatentData = usptoPftapsDataArray.pop();

  // Checking that the values in the sample data match the expected values
  const usptoPftapsActualData: UsptoPatentData = usptoPftapsData;

  avaTest.context.usptoActualData = usptoPftapsActualData;
});


test('Testing USPTO Pftaps Converter Value: applicationNumber', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.applicationNumber;
  const usptoExpectedValue: string = '3800358';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: language', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.language;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: country', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.country;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: dateProduced', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.dateProduced;
  const usptoExpectedValue: string = '19930125';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: datePublished', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.datePublished;
  const usptoExpectedValue: string = '19940104';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: dtdVersion', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.dtdVersion;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: fileName', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.fileName;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: patentStatus', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.patentStatus;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: patentClaims', async (avaTest: any) => {

  const usptoActualValue: number = avaTest.context.usptoActualData.patentClaims.length;
  const usptoExpectedValue: number = 2;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: inventionTitle', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.inventionTitle;
  const usptoExpectedValue: string = 'Deburring apparatus';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: inventionId', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.inventionId;
  const usptoExpectedValue: string = '19940104';

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: company', async (avaTest: any) => {

  const usptoActualValue: string = avaTest.context.usptoActualData.company;
  const usptoExpectedValue: string = null;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});


test('Testing USPTO Pftaps Converter Value: applicants', async (avaTest: any) => {

  const usptoActualValue: number = avaTest.context.usptoActualData.applicants.length;
  const usptoExpectedValue: number = 1;

  avaTest.true(usptoActualValue === usptoExpectedValue);
});