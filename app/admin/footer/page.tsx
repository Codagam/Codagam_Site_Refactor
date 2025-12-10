"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Save } from "lucide-react";

interface FooterContent {
  id: string;
  title: string;
  description: string;
}

interface FooterOffice {
  id: string;
  country: string;
  countryCode: string | null;
  countryPosition: number;
  flagUrl: string | null; // Deprecated, kept for backward compatibility
  address: string;
  phone: string | null;
  email: string | null;
  position: number;
}

interface FooterSocialLink {
  id: string;
  platform: string;
  url: string;
  iconType: string;
  position: number;
}

export default function FooterAdminPage() {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    id: "footer_content",
    title: "",
    description: "",
  });
  const [offices, setOffices] = useState<FooterOffice[]>([]);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const [contentRes, officesRes, socialLinksRes] = await Promise.all([
        fetch("/api/footer/content"),
        fetch("/api/footer/offices"),
        fetch("/api/footer/social-links"),
      ]);

      if (contentRes.ok) {
        const content = await contentRes.json();
        setFooterContent(content);
      }

      if (officesRes.ok) {
        const officesData = await officesRes.json();
        setOffices(officesData);
      }

      if (socialLinksRes.ok) {
        const socialLinksData = await socialLinksRes.json();
        setSocialLinks(socialLinksData);
      }
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setMessage({ type: "error", text: "Failed to load footer data" });
    } finally {
      setIsLoading(false);
    }
  };

  const saveFooterContent = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/footer/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footerContent),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Footer content saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save footer content" });
      }
    } catch {
      setMessage({ type: "error", text: "Error saving footer content" });
    } finally {
      setSaving(false);
    }
  };

  const addOffice = () => {
    // Get the max country position to add a new country
    const maxCountryPosition = offices.length > 0
      ? Math.max(...offices.map((o) => o.countryPosition))
      : -1;
    
    const newOffice: FooterOffice = {
      id: `office_${Date.now()}`,
      country: "",
      countryCode: null,
      countryPosition: maxCountryPosition + 1,
      flagUrl: null,
      address: "",
      phone: null,
      email: null,
      position: 0,
    };
    setOffices([...offices, newOffice]);
  };

  const updateOffice = (id: string, field: keyof FooterOffice, value: string | number | null) => {
    setOffices(
      offices.map((office) => (office.id === id ? { ...office, [field]: value } : office))
    );
  };

  const deleteOffice = async (id: string) => {
    try {
      const response = await fetch(`/api/footer/offices/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOffices(offices.filter((office) => office.id !== id));
        setMessage({ type: "success", text: "Office deleted successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to delete office" });
      }
    } catch {
      setMessage({ type: "error", text: "Error deleting office" });
    }
  };

  const saveOffice = async (office: FooterOffice) => {
    if (!office.country || !office.address) {
      setMessage({
        type: "error",
        text: "Please fill in Country and Address",
      });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const isNew = office.id.startsWith("office_");
      const url = isNew
        ? "/api/footer/offices"
        : `/api/footer/offices/${office.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(office),
      });

      if (response.ok) {
        const savedOffice = await response.json();
        setOffices(
          offices.map((o) => (o.id === office.id ? savedOffice : o))
        );
        setMessage({ type: "success", text: "Office saved successfully!" });
        await fetchFooterData(); // Refresh to get updated IDs
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.error || "Failed to save office",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Error saving office" });
    } finally {
      setSaving(false);
    }
  };

  const addSocialLink = () => {
    const newLink: FooterSocialLink = {
      id: `social_${Date.now()}`,
      platform: "",
      url: "",
      iconType: "",
      position: socialLinks.length,
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const updateSocialLink = (id: string, field: keyof FooterSocialLink, value: string | number) => {
    setSocialLinks(
      socialLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const deleteSocialLink = async (id: string) => {
    try {
      const response = await fetch(`/api/footer/social-links/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
        setMessage({ type: "success", text: "Social link deleted successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to delete social link" });
      }
    } catch {
      setMessage({ type: "error", text: "Error deleting social link" });
    }
  };

  const saveSocialLink = async (link: FooterSocialLink) => {
    setSaving(true);
    setMessage(null);
    try {
      const isNew = link.id.startsWith("social_");
      const url = isNew
        ? "/api/footer/social-links"
        : `/api/footer/social-links/${link.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(link),
      });

      if (response.ok) {
        const savedLink = await response.json();
        setSocialLinks(
          socialLinks.map((l) => (l.id === link.id ? savedLink : l))
        );
        setMessage({ type: "success", text: "Social link saved successfully!" });
        await fetchFooterData(); // Refresh to get updated IDs
      } else {
        setMessage({ type: "error", text: "Failed to save social link" });
      }
    } catch {
      setMessage({ type: "error", text: "Error saving social link" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Footer Admin Dashboard</h1>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {message.text}
          </div>
        )}

        {/* Footer Content Section */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Footer Header Content</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={footerContent.title}
                onChange={(e) =>
                  setFooterContent({ ...footerContent, title: e.target.value })
                }
                placeholder="Let's Build Something Great"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={footerContent.description}
                onChange={(e) =>
                  setFooterContent({
                    ...footerContent,
                    description: e.target.value,
                  })
                }
                placeholder="Ready to transform your ideas into scalable products? Reach out to discuss your project."
                rows={3}
              />
            </div>
            <Button onClick={saveFooterContent} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Save Content
            </Button>
          </div>
        </Card>

        {/* Offices Section - Grouped by Country */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Offices by Country</h2>
            <Button onClick={addOffice}>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
          <div className="space-y-6">
            {(() => {
              // Group offices by country
              const grouped = offices.reduce((acc, office) => {
                const country = office.country || "Unassigned";
                if (!acc[country]) {
                  acc[country] = [];
                }
                acc[country].push(office);
                return acc;
              }, {} as Record<string, FooterOffice[]>);

              // Sort countries by countryPosition
              const sortedCountries = Object.keys(grouped).sort((a, b) => {
                const aPos = grouped[a][0]?.countryPosition ?? 999;
                const bPos = grouped[b][0]?.countryPosition ?? 999;
                return aPos - bPos;
              });

              return sortedCountries.map((country) => {
                const countryOffices = grouped[country].sort(
                  (a, b) => a.position - b.position
                );
                const countryPosition = countryOffices[0]?.countryPosition ?? 0;
                const flagUrl = countryOffices[0]?.flagUrl;

                return (
                  <Card key={country} className="p-4 border-2">
                    <div className="mb-4 pb-2 border-b">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        {flagUrl && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={flagUrl}
                            alt={`${country} flag`}
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        {country}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Country Position: {countryPosition} | Locations:{" "}
                        {countryOffices.length}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {countryOffices.map((office, index) => (
                        <Card key={office.id} className="p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold">
                              Location {index + 1} (Position: {office.position})
                            </h4>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => saveOffice(office)}
                                disabled={saving}>
                                <Save className="w-4 h-4" />
                              </Button>
                              {!office.id.startsWith("office_") && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteOffice(office.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Country *</Label>
                              <Input
                                value={office.country}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "country",
                                    e.target.value
                                  )
                                }
                                placeholder="India"
                                required
                              />
                            </div>
                            <div>
                              <Label>Country Position</Label>
                              <Input
                                type="number"
                                value={office.countryPosition}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "countryPosition",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="0"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Lower numbers appear first
                              </p>
                            </div>
                            <div>
                              <Label>Location Position</Label>
                              <Input
                                type="number"
                                value={office.position}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "position",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="0"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Position within country
                              </p>
                            </div>
                            <div>
                              <Label>Country Code (ISO 2-letter, e.g., IN, US, GB)</Label>
                              <Input
                                value={office.countryCode || ""}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "countryCode",
                                    e.target.value.toUpperCase() || null
                                  )
                                }
                                placeholder="IN"
                                maxLength={2}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Use ISO 3166-1 alpha-2 code (e.g., IN for India, US for USA)
                              </p>
                            </div>
                            <div>
                              <Label>Flag URL (optional, fallback if country code not set)</Label>
                              <Input
                                value={office.flagUrl || ""}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "flagUrl",
                                    e.target.value || null
                                  )
                                }
                                placeholder="https://flagcdn.com/w320/in.png"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Address *</Label>
                              <Textarea
                                value={office.address}
                                onChange={(e) =>
                                  updateOffice(office.id, "address", e.target.value)
                                }
                                placeholder="363/2, Rukmani Nagar,&#10;Nagarpalaya Rd,&#10;Gobichettipalayam,&#10;Tamil Nadu, India, 638452"
                                rows={4}
                                required
                              />
                            </div>
                            <div>
                              <Label>Phone (optional)</Label>
                              <Input
                                value={office.phone || ""}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "phone",
                                    e.target.value || null
                                  )
                                }
                                placeholder="+91 75984 54546"
                              />
                            </div>
                            <div>
                              <Label>Email (optional)</Label>
                              <Input
                                type="email"
                                value={office.email || ""}
                                onChange={(e) =>
                                  updateOffice(
                                    office.id,
                                    "email",
                                    e.target.value || null
                                  )
                                }
                                placeholder="Support@codagam.com"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                );
              });
            })()}
            {offices.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No offices added yet. Click &quot;Add Location&quot; to get started.
              </p>
            )}
          </div>
        </Card>

        {/* Social Links Section */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Social Media Links</h2>
            <Button onClick={addSocialLink}>
              <Plus className="w-4 h-4 mr-2" />
              Add Social Link
            </Button>
          </div>
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <Card key={link.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">Social Link {index + 1}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => saveSocialLink(link)}
                      disabled={saving}>
                      <Save className="w-4 h-4" />
                    </Button>
                    {!link.id.startsWith("social_") && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteSocialLink(link.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Platform *</Label>
                    <Input
                      value={link.platform}
                      onChange={(e) =>
                        updateSocialLink(link.id, "platform", e.target.value)
                      }
                      placeholder="instagram, facebook, twitter, linkedin, youtube, github, whatsapp, telegram"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported: instagram, facebook, twitter/x, linkedin, youtube, github, whatsapp, telegram
                    </p>
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(link.id, "url", e.target.value)
                      }
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

