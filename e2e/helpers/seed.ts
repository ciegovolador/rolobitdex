/**
 * Test data factories for E2E tests.
 * These create realistic test data via the app's UI or API.
 */

export const testContacts = {
  alice: {
    name: 'Alice Nakamoto',
    bankName: 'Bitcoin Bank',
    accountIdentifier: 'alice@bitcoinbank.com',
    silentPaymentAddress: 'sp1qqw6rehk5yef5gfn7tc5xnm4gvda4u5a3yjhag7kv80smr9jqqqqqqqnfk36cxaz5f2uxsunrwpek2s40maaxngkjaq8rv2efr98sveqvzq2fvt0k',
  },
  bob: {
    name: 'Bob Finney',
    bankName: 'Satoshi Savings',
    accountIdentifier: 'bob@satoshisavings.com',
    silentPaymentAddress: 'sp1qqw6rehk5yef5gfn7tc5xnm4gvda4u5a3yjhag7kv80smr9jqqqqqqqnfk36cxaz5f2uxsunrwpek2s40maaxngkjaq8rv2efr98sveqvzq3abc',
  },
};

export const testTrades = {
  buyBitcoin: {
    type: 'buy' as const,
    satsAmount: '100000',
    fiatCurrency: 'USD',
    fiatAmount: '50.00',
  },
  sellBitcoin: {
    type: 'sell' as const,
    satsAmount: '200000',
    fiatCurrency: 'EUR',
    fiatAmount: '85.00',
  },
};
