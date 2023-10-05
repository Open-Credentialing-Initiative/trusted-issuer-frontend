import type {NextPage} from 'next';
import Head from 'next/head';
import {useAutoConnect} from "../hooks/useAutoConnect";
import {useAccount} from "wagmi";
import {Navigation} from "../components/Navigation";
import {columns, CredentialType, TrustedIssuer} from "../components/trusted-issuers-table/columns";
import {DataTable} from "../components/trusted-issuers-table/data-table";

const Home: NextPage = () => {
  const {address} = useAccount();
  const data: TrustedIssuer[] =  [
    {
      did: "did:ethr:0x967fced2cb1aFb5f973816d2d643fE910B05df84",
      credentialType: CredentialType.DSCSAATPCredential
    },
    {
      did: "did:ethr:0xBc9B246690b4d11ab1747eA0af6F753430D53fbF",
      credentialType: CredentialType.DSCSAATPCredential
    },
    {
      did: "did:ethr:0xBc9B246690b4d11ab1747eA0af6F753430D53fbF",
      credentialType: CredentialType.IdentityCredential
    },
  ]

  useAutoConnect();

  return (
    <>
      <Head>
        <title>OCI Trusted Issuer List</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon"/>
      </Head>
      <div className="min-h-screen bg-white">
        <Navigation/>
        <div className="mx-auto max-w-6xl px-2 py-10">
          <header>
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-800">Trusted Issuers</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Manage the list of trusted issuers for your OCI ecosystem.
                </p>
              </div>
            </div>
          </header>
          <main className="mt-5">
            <DataTable columns={columns} data={data} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
