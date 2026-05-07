"use client";

import { useEffect, useState } from "react";
import { 
  BarChart3, 
  Settings2, 
  Database, 
  Save, 
  RefreshCw, 
  ExternalLink,
  Loader2,
  Info,
  Table as TableIcon,
  Search,
  ArrowUpRight,
  TrendingUp,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { getDesaProfile, updateDesaProfile } from "@/lib/api/desa";
import { getIdmData, getSdgsData, updateKemendesaSettings } from "@/lib/api/kemendesa";
import { Desa } from "@/types";

export default function KemendesaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [desa, setDesa] = useState<Desa | null>(null);
  
  // Kemendesa Data
  const [idmData, setIdmData] = useState<any>(null);
  const [sdgsData, setSdgsData] = useState<any>(null);
  const [tahun, setTahun] = useState<number>(new Date().getFullYear());
  const [tahunInput, setTahunInput] = useState<string>(new Date().getFullYear().toString());
  
  // Search Filter
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    kode_desa_idm: "",
    kode_desa_sdgs: ""
  });

  const loadAllData = async () => {
    try {
      setLoading(true);
      const profile = await getDesaProfile();
      setDesa(profile);
      setFormData({
        kode_desa_idm: profile.kode_desa_idm || "",
        kode_desa_sdgs: profile.kode_desa_sdgs || ""
      });

      // Load Kemendesa Data in parallel
      const [idm, sdgs] = await Promise.allSettled([
        getIdmData(tahun, profile.kode_desa),
        getSdgsData(profile.kode_desa)
      ]);

      if (idm.status === "fulfilled") setIdmData(idm.value);
      if (sdgs.status === "fulfilled") setSdgsData(sdgs.value);

    } catch (error) {
      console.error("Error loading Kemendesa data:", error);
      toast.error("Gagal memuat data Kemendesa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahun]);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await updateKemendesaSettings({
        kode_desa_idm: formData.kode_desa_idm,
        kode_desa_sdgs: formData.kode_desa_sdgs
      });
      toast.success("Konfigurasi berhasil disimpan");
      loadAllData();
    } catch (error) {
      toast.error("Gagal menyimpan konfigurasi");
    } finally {
      setSaving(false);
    }
  };

  const handleRefreshData = async () => {
    try {
      setRefreshing(true);
      const [idm, sdgs] = await Promise.allSettled([
        getIdmData(tahun, desa?.kode_desa),
        getSdgsData(desa?.kode_desa)
      ]);
      if (idm.status === "fulfilled") setIdmData(idm.value);
      if (sdgs.status === "fulfilled") setSdgsData(sdgs.value);
      toast.success("Data berhasil diperbarui dari API");
    } catch (error) {
      toast.error("Gagal memperbarui data");
    } finally {
      setRefreshing(false);
    }
  };

  // Filter IDM rows based on search
  const filteredIdmRows = idmData?.mapData?.ROW?.filter((row: any) => 
    row.INDIKATOR?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.KETERANGAN?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading && !refreshing) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrasi Kemendesa</h1>
          <p className="text-sm text-muted-foreground">Monitoring data IDM dan SDGs secara real-time dari sistem pusat</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={refreshing}>
            {refreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh Data
          </Button>
          <Button className="bg-emerald-700 hover:bg-emerald-800" size="sm" onClick={handleSaveSettings} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Konfigurasi
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 size={18} className="text-emerald-600" />
                Konfigurasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kode_idm" className="text-xs">Kode Desa IDM</Label>
                <Input 
                  id="kode_idm" 
                  className="h-8 text-sm"
                  value={formData.kode_desa_idm} 
                  onChange={(e) => setFormData({...formData, kode_desa_idm: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kode_sdgs" className="text-xs">Kode Desa SDGs</Label>
                <Input 
                  id="kode_sdgs" 
                  className="h-8 text-sm"
                  value={formData.kode_desa_sdgs} 
                  onChange={(e) => setFormData({...formData, kode_desa_sdgs: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tahun_idm" className="text-xs">Tahun Analisis</Label>
                <div className="flex gap-2">
                  <Input 
                    id="tahun_idm" 
                    type="number" 
                    className="h-8 text-sm"
                    value={tahunInput} 
                    onChange={(e) => setTahunInput(e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    className="h-8 px-2" 
                    variant="secondary"
                    onClick={() => setTahun(parseInt(tahunInput))}
                  >
                    Terapkan
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                 <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                   <p className="text-[10px] text-blue-700 leading-relaxed">
                     <Info size={12} className="inline mr-1" />
                     Data diambil langsung dari endpoint publik Kemendesa. Pastikan kode wilayah sudah benar sesuai data BPS/Kemendagri.
                   </p>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-emerald-600 text-white border-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-100">Status IDM</p>
                  <p className="text-lg font-bold">{idmData?.mapData?.SUMMARIES?.STATUS || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-sky-600 text-white border-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-sky-100">Skor SDGs</p>
                  <p className="text-lg font-bold">{sdgsData?.average || "0.00"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="idm" className="w-full">
            <div className="flex items-center justify-between mb-4 bg-muted/50 p-1 rounded-lg">
              <TabsList className="grid grid-cols-2 bg-transparent">
                <TabsTrigger value="idm" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <BarChart3 size={16} className="mr-2" />
                  Indikator IDM
                </TabsTrigger>
                <TabsTrigger value="sdgs" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <TrendingUp size={16} className="mr-2" />
                  Capaian SDGs
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center px-3 gap-2">
                 <Search size={14} className="text-muted-foreground" />
                 <input 
                   type="text" 
                   placeholder="Cari indikator..." 
                   className="bg-transparent border-none text-xs focus:ring-0 w-40"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
            </div>

            {/* IDM Tab Content */}
            <TabsContent value="idm" className="mt-0">
               <Card>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <div>
                     <CardTitle className="text-base font-bold">Detail Indikator IDM {tahun}</CardTitle>
                     <CardDescription className="text-xs">Daftar variabel penilaian Indeks Desa Membangun</CardDescription>
                   </div>
                   <Badge variant="outline" className="font-mono text-[10px]">
                     {filteredIdmRows.length} Indikator
                   </Badge>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="rounded-md border-t">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="w-12 text-center text-[10px] uppercase font-bold">No</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Indikator</TableHead>
                            <TableHead className="w-20 text-center text-[10px] uppercase font-bold">Skor</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Keterangan / Rekomendasi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredIdmRows.length > 0 ? (
                            filteredIdmRows.map((row: any, index: number) => (
                              <TableRow key={`${row.NO}-${row.INDIKATOR}-${index}`} className="hover:bg-muted/20">
                                <TableCell className="text-center text-xs font-medium text-muted-foreground">{row.NO}</TableCell>
                                <TableCell>
                                  <p className="text-xs font-bold leading-none">{row.INDIKATOR}</p>
                                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{row.KEGIATAN !== '-' ? row.KEGIATAN : ''}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                   <Badge 
                                     variant="secondary" 
                                     className={`text-[10px] font-bold ${row.SKOR >= 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                                   >
                                     {row.SKOR}
                                   </Badge>
                                </TableCell>
                                <TableCell className="text-[11px] text-muted-foreground italic leading-relaxed">
                                  {row.KETERANGAN}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground text-sm">
                                Tidak ada data indikator ditemukan
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                 </CardContent>
               </Card>
            </TabsContent>

            {/* SDGs Tab Content */}
            <TabsContent value="sdgs" className="mt-0">
               <Card>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <div>
                     <CardTitle className="text-base font-bold">18 Tujuan SDGs Desa</CardTitle>
                     <CardDescription className="text-xs">Capaian pembangunan berkelanjutan tingkat desa</CardDescription>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <TrendingUp size={12} className="text-emerald-600" />
                      Avg: <span className="font-bold text-emerald-700">{sdgsData?.average || "0"}</span>
                   </div>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="rounded-md border-t overflow-hidden">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="w-12 text-center text-[10px] uppercase font-bold">Tujuan</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold">Deskripsi Capaian</TableHead>
                            <TableHead className="w-24 text-center text-[10px] uppercase font-bold">Skor</TableHead>
                            <TableHead className="w-48 text-[10px] uppercase font-bold">Visual Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sdgsData?.data ? (
                            sdgsData.data.map((item: any, index: number) => (
                              <TableRow key={`${item.goals}-${index}`} className="hover:bg-muted/20">
                                <TableCell className="text-center">
                                   <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs mx-auto">
                                     {item.goals}
                                   </div>
                                </TableCell>
                                <TableCell>
                                  <p className="text-xs font-bold leading-none">{item.title}</p>
                                  <p className="text-[10px] text-muted-foreground mt-1">Sustainable Development Goals</p>
                                </TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">
                                  {item.score?.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                   <div className="w-full bg-muted rounded-full h-2 overflow-hidden border">
                                      <div 
                                        className={`h-full transition-all duration-1000 ${
                                          item.score > 75 ? 'bg-emerald-500' : 
                                          item.score > 50 ? 'bg-sky-500' : 
                                          item.score > 25 ? 'bg-amber-500' : 'bg-rose-500'
                                        }`}
                                        style={{ width: `${item.score}%` }}
                                      />
                                   </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground text-sm">
                                Tidak ada data SDGs ditemukan
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                 </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-dashed">
             <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Database size={14} />
                <span>API Status: <span className="text-emerald-600 font-bold">Connected</span></span>
             </div>
             <a 
               href={sdgsData ? `https://sid.kemendesa.go.id/sdgs/searching/score-sdgs?location_code=${formData.kode_desa_sdgs}` : "#"}
               target="_blank"
               className="text-[11px] text-sky-600 font-semibold hover:underline flex items-center gap-1"
             >
               Buka Portal Resmi <ArrowUpRight size={12} />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
